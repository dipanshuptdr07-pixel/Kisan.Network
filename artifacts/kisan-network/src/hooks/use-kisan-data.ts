import { useEffect, useState } from 'react';
import { demoRepository, demoSnapshot, type KisanRepository } from '../data/repository';

export function useKisanData(repository: KisanRepository = demoRepository) {
  const [snapshot, setSnapshot] = useState(demoSnapshot);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let active = true;
    repository.loadSnapshot().then((data) => {
      if (!active) return;
      setSnapshot(data);
      setStatus('ready');
    }).catch((cause: unknown) => {
      if (!active) return;
      setError(cause instanceof Error ? cause : new Error('Unable to load Kisan Network data.'));
      setStatus('error');
    });
    return () => {
      active = false;
    };
  }, [repository]);

  return { snapshot, status, error };
}
