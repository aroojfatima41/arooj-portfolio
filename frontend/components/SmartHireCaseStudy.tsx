'use client';

export default function SmartHireCaseStudy({ homepage = false }: { homepage?: boolean }) {
  const services = [
    'User Service',
    'Job Service',
    'AI Matching Service',
    'Workflow Orchestration',
    'Notification Service',
    'Analytics Service',
  ];

  const flow = [
    'Candidates and recruiters interact with the platform through a web portal.',
    'Each service owns its own database and publishes domain events to Kafka.',
    'Temporal coordinates long-running recruitment workflows across service boundaries.',
    'AI and semantic search modules compare candidates against jobs using vector embeddings.',
    'Dashboards and notifications deliver updates in near real time to stakeholders.',
  ];

  const architectureStages = [
    'Resume',
    'Document Processing',
    'AI Extraction',
    'Embeddings',
    'Vector Search',
    'Matching',
    'Workflow',
  ];

  return (
    <section id="smart-hire" className="section-rule px-6 py-20 text-ink md:py-24">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-copper/25 bg-[linear-gradient(135deg,rgba(217,143,79,0.10),rgba(18,27,46,0.82)_42%,rgba(9,14,23,0.95))] p-6 md:p-10">
        <div className="mb-10">
          <p className="mb-4 font-mono text-sm uppercase tracking-widest text-signal">
            AI recruitment platform
          </p>
          {homepage ? (
            <h2 className="mb-5 font-display text-5xl leading-tight text-ink md:text-6xl">Smart Hire</h2>
          ) : (
            <h1 className="mb-5 font-display text-5xl leading-tight text-ink md:text-6xl">Smart Hire</h1>
          )}
          <p className="max-w-3xl font-body text-lg leading-relaxed text-muted">
            A distributed hiring platform connecting job discovery, candidate matching, and recruitment workflows through event-driven services and durable orchestration.
          </p>
        </div>

        <div className="border-y border-white/10 py-7">
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="font-display text-2xl text-ink md:text-3xl">Architecture path</h3>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-signal">
              Document to decision support
            </span>
          </div>
          <div className="smart-flow" aria-label="Resume to workflow architecture path">
            {architectureStages.map((stage, index) => (
              <div key={stage} className="smart-flow-step">
                <span className="smart-flow-index">0{index + 1}</span>
                <span className="smart-flow-label">{stage}</span>
                {index < architectureStages.length - 1 && <span className="smart-flow-arrow" aria-hidden="true">→</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 border-b border-white/10 py-7 md:grid-cols-2">
          <div>
            <h3 className="mb-4 font-display text-2xl text-ink">Six platform services</h3>
            <ul className="grid gap-2 text-sm leading-relaxed text-muted sm:grid-cols-2">
              {services.map((service) => (
                <li key={service} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-2xl text-ink">Core stack</h3>
            <div className="flex flex-wrap gap-2">
              {['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'Kafka', 'Temporal', 'Docker', 'Groq LLM'].map((tech) => (
                <span key={tech} className="rounded-full border border-copper/25 bg-copper/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-copper">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-b border-white/10 py-7">
          <h3 className="mb-5 font-display text-2xl text-ink">How the platform works</h3>
          <ol className="grid gap-x-8 gap-y-4 md:grid-cols-2">
            {flow.map((step, index) => (
              <li key={step} className="flex items-start gap-3">
                <span className="font-mono text-xs text-signal">0{index + 1}</span>
                <span className="text-sm leading-relaxed text-muted">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid gap-6 pt-7 md:grid-cols-3">
          <div>
            <h3 className="mb-2 font-display text-lg text-ink">Event-driven design</h3>
            <p className="text-sm leading-relaxed text-muted">Kafka keeps services decoupled through asynchronous domain events.</p>
          </div>
          <div>
            <h3 className="mb-2 font-display text-lg text-ink">AI-assisted matching</h3>
            <p className="text-sm leading-relaxed text-muted">Embeddings and vector search help surface relevant candidates.</p>
          </div>
          <div>
            <h3 className="mb-2 font-display text-lg text-ink">Durable workflows</h3>
            <p className="text-sm leading-relaxed text-muted">Temporal coordinates long-running recruitment workflows.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
