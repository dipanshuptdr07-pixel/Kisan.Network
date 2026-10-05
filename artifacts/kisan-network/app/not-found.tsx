import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ minHeight: '100dvh', display: 'grid', placeItems: 'center', padding: 24, background: 'var(--bg)', color: 'var(--ink)' }}>
      <section className="card" style={{ width: 'min(100%, 520px)', padding: 32, textAlign: 'center' }}>
        <div className="eyebrow">PAGE NOT FOUND</div>
        <h1 className="font-display" style={{ fontSize: 28, margin: '12px 0 8px' }}>This workspace page does not exist.</h1>
        <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.65 }}>Check the address or return to sign in to choose a workspace.</p>
        <Link href="/login" className="btn-primary" style={{ marginTop: 12 }}>Back to sign in</Link>
      </section>
    </main>
  );
}
