'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import { translateText, type Language } from '../lib/i18n';

type LanguageControlState = {
  text: WeakMap<Text, string>;
  textWritten: WeakMap<Text, string>;
  attributes: WeakMap<Element, Map<string, string>>;
  attributesWritten: WeakMap<Element, Map<string, string>>;
};

function isSkipped(node: Node): boolean {
  const element = node.nodeType === Node.ELEMENT_NODE ? node as Element : node.parentElement;
  return !!element?.closest('[data-i18n-skip],script,style,noscript,textarea,[contenteditable="true"]');
}

function LanguageDocument({ language }: { language: Language }) {
  const memory = useRef<LanguageControlState>({
    text: new WeakMap(),
    textWritten: new WeakMap(),
    attributes: new WeakMap(),
    attributesWritten: new WeakMap(),
  });

  useEffect(() => {
    document.documentElement.lang = language;

    const translateTextNode = (node: Text) => {
      if (isSkipped(node)) return;
      const current = node.data;
      const lastWritten = memory.current.textWritten.get(node);
      if (lastWritten !== current || !memory.current.text.has(node)) {
        memory.current.text.set(node, current);
      }
      const source = memory.current.text.get(node) ?? current;
      const translated = translateText(source, language);
      if (translated !== current) {
        memory.current.textWritten.set(node, translated);
        node.data = translated;
      } else {
        memory.current.textWritten.set(node, current);
      }
    };

    const translateAttributes = (element: Element) => {
      if (isSkipped(element)) return;
      const names = ['aria-label', 'placeholder', 'title', 'alt'];
      for (const name of names) {
        if (!element.hasAttribute(name)) continue;
        let sources = memory.current.attributes.get(element);
        if (!sources) {
          sources = new Map();
          memory.current.attributes.set(element, sources);
        }
        let written = memory.current.attributesWritten.get(element);
        if (!written) {
          written = new Map();
          memory.current.attributesWritten.set(element, written);
        }
        const current = element.getAttribute(name) || '';
        if (written.get(name) !== current || !sources.has(name)) sources.set(name, current);
        const translated = translateText(sources.get(name) || '', language);
        if (translated !== current) {
          written.set(name, translated);
          element.setAttribute(name, translated);
        } else {
          written.set(name, current);
        }
      }
    };

    const scan = (root: Node) => {
      if (isSkipped(root)) return;
      if (root.nodeType === Node.TEXT_NODE) {
        translateTextNode(root as Text);
        return;
      }
      if (root.nodeType === Node.ELEMENT_NODE) translateAttributes(root as Element);
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let current = walker.nextNode();
      while (current) {
        translateTextNode(current as Text);
        current = walker.nextNode();
      }
      if (root instanceof Element) {
        root.querySelectorAll('*').forEach(translateAttributes);
      }
    };

    const title = 'Kisan Network — Smart Agriculture';
    const description = 'One shared workspace for India’s agriculture community.';
    document.title = translateText(title, language);
    const descriptionTag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (descriptionTag) descriptionTag.content = translateText(description, language);

    scan(document.body);
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        if (record.type === 'characterData' && record.target instanceof Text) {
          translateTextNode(record.target);
        } else if (record.type === 'attributes' && record.target instanceof Element) {
          translateAttributes(record.target);
        } else {
          record.addedNodes.forEach(scan);
        }
      }
    });
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['aria-label', 'placeholder', 'title', 'alt'],
    });

    return () => observer.disconnect();
  }, [language]);

  return null;
}

function LanguageSwitch({ language, onChange, placement }: {
  language: Language;
  onChange: (language: Language) => void;
  placement: 'toolbar' | 'auth' | 'onboarding' | 'floating';
}) {
  const buttonStyle = (selected: boolean): React.CSSProperties => ({
    border: 0,
    borderRadius: 8,
    padding: '7px 9px',
    background: selected ? 'var(--green)' : 'transparent',
    color: selected ? '#fff' : 'var(--muted)',
    fontSize: 11,
    lineHeight: 1.2,
    fontWeight: 800,
    whiteSpace: 'nowrap',
  });

  return <div
    className={`language-switch language-switch--${placement}`}
    data-i18n-skip=""
    role="group"
    aria-label={language === 'hi' ? 'भाषा चुनें' : 'Choose language'}
  >
    <button type="button" aria-pressed={language === 'hi'} onClick={() => onChange('hi')} style={buttonStyle(language === 'hi')}>हिन्दी</button>
    <button type="button" aria-pressed={language === 'en'} onClick={() => onChange('en')} style={buttonStyle(language === 'en')}>English</button>
  </div>;
}

export function LanguageLayer({ children, readStorage, writeStorage }: {
  children: React.ReactNode;
  readStorage: (key: string) => string | null;
  writeStorage: (key: string, value: string) => void;
}) {
  const pathname = usePathname() || '/';
  const [language, setLanguage] = useState<Language>('hi');
  const [languageReady, setLanguageReady] = useState(false);
  const [target, setTarget] = useState<{ element: Element; placement: 'toolbar' | 'auth' | 'onboarding' | 'floating' } | null>(null);

  useEffect(() => {
    const saved = readStorage('kn-language');
    setLanguage(saved === 'en' ? 'en' : 'hi');
    setLanguageReady(true);
  }, [readStorage]);

  useEffect(() => {
    if (languageReady) writeStorage('kn-language', language);
  }, [language, languageReady, writeStorage]);

  useEffect(() => {
    let element: Element | null = null;
    let placement: 'toolbar' | 'auth' | 'onboarding' | 'floating' = 'floating';
    if (pathname === '/login' || pathname === '/verify') {
      element = document.querySelector('.auth-panel');
      placement = 'auth';
    } else if (pathname === '/onboarding') {
      element = document.querySelector('main > div:first-child');
      placement = 'onboarding';
    } else {
      element = document.querySelector('.topbar > div:last-child');
      placement = 'toolbar';
    }
    setTarget(element ? { element, placement } : { element: document.body, placement: 'floating' });
  }, [pathname]);

  return <>
    <LanguageDocument language={language}/>
    {children}
    {target && createPortal(
      <LanguageSwitch language={language} onChange={setLanguage} placement={target.placement}/>,
      target.element,
    )}
  </>;
}
