'use client';

export default function SmartHireCaseStudy() {
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
    <section className="max-w-5xl mx-auto px-6 py-20 text-ink">
      <div className="mb-12">
        <p className="font-mono text-signal text-sm tracking-widest uppercase mb-4">
          AI recruitment platform
        </p>
        <h1 className="font-display text-5xl md:text-6xl leading-tight mb-6">
          Smart Hire
        </h1>
        <p className="max-w-3xl font-body text-muted text-lg leading-relaxed">
          A distributed hiring platform designed to improve recruitment efficiency by connecting
          job discovery, candidate matching, and workflow automation through AI-driven insights and
          event-based service orchestration.
        </p>
      </div>

      <div className="mb-12 rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(217,143,79,0.1),rgba(18,27,46,0.82))] p-5 md:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="font-display text-2xl text-ink md:text-3xl">Architecture path</h2>
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

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-panel border border-copper/20 rounded-xl p-7">
          <h2 className="font-display text-2xl mb-5">Business value</h2>
          <ul className="space-y-3 font-body text-muted leading-relaxed">
            {services.map((service) => (
              <li key={service} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-copper shrink-0" />
                <span>{service}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-panel border border-copper/20 rounded-xl p-7">
          <h2 className="font-display text-2xl mb-5">Core stack</h2>
          <div className="flex flex-wrap gap-2">
            {[
              'Python',
              'FastAPI',
              'PostgreSQL',
              'pgvector',
              'Kafka',
              'Temporal',
              'Docker',
              'Groq LLM',
            ].map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs text-copper border border-copper/30 rounded px-2 py-1"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-panel border border-copper/20 rounded-xl p-8 mb-12">
        <h2 className="font-display text-3xl mb-6">How the platform works</h2>
        <div className="space-y-4">
          {flow.map((step, index) => (
            <div key={step} className="flex gap-4 items-start">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-copper text-xs font-mono text-ink font-bold">
                {index + 1}
              </div>
              <p className="font-body text-muted leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="border border-copper/20 rounded-xl p-5">
          <h3 className="font-display text-xl mb-3">Event-driven design</h3>
          <p className="font-body text-muted leading-relaxed">
            Services communicate asynchronously to keep recruitment operations decoupled,
            resilient, and ready to scale across hiring pipelines.
          </p>
        </div>

        <div className="border border-copper/20 rounded-xl p-5">
          <h3 className="font-display text-xl mb-3">AI-assisted matching</h3>
          <p className="font-body text-muted leading-relaxed">
            Semantic search and embedding-based matching help recruiters identify the most relevant
            candidates faster and with less manual filtering.
          </p>
        </div>

        <div className="border border-copper/20 rounded-xl p-5">
          <h3 className="font-display text-xl mb-3">Operational scalability</h3>
          <p className="font-body text-muted leading-relaxed">
            The architecture reflects production concerns such as workflow orchestration,
            observability, and service ownership for real-world delivery pipelines.
          </p>
        </div>
      </div>
    </section>
  );
}
