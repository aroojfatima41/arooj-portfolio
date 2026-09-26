export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <p className="font-mono text-signal text-sm tracking-widest uppercase mb-4">404</p>
        <h1 className="font-display text-3xl text-ink mb-2">Signal lost</h1>
        <p className="font-body text-muted">No project found at this trace.</p>
      </div>
    </main>
  );
}