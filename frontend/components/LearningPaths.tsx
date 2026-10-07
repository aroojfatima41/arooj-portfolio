import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const backendPath = ['FastAPI', 'Docker', 'Kafka', 'Temporal'];

export default function LearningPaths() {
  return (
    <section id="learning-paths" className="section-rule px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <p className="section-kicker mb-4">Beyond selected work</p>
          <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">
            Experiments &amp; Learning Paths
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Smaller projects and focused explorations, kept separate from production-scale case studies.
          </p>
        </div>

        <div className="grid gap-8 border-y border-white/10 py-7 md:grid-cols-2 md:gap-12">
          <article className="flex flex-col items-start">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Frontend experiment
            </p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-ink">Angular Todo App</h3>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
              A focused Angular exercise in reactive state, forms, validation, and interaction feedback.
            </p>
            <Link
              href="/projects/angular-todo-app"
              className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-signal transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
            >
              Explore the experiment
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </article>

          <article>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Learning path
            </p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-ink">
              Microservices &amp; Workflows
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
              Building deeper backend fluency: from API services and containerization to event streaming and durable orchestration.
            </p>
            <ol className="mt-5 flex flex-wrap items-center gap-2" aria-label="Backend systems learning path">
              {backendPath.map((step, index) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ink/80">
                    {step}
                  </span>
                  {index < backendPath.length - 1 && (
                    <span className="text-xs text-muted" aria-hidden="true">→</span>
                  )}
                </li>
              ))}
            </ol>
          </article>
        </div>
      </div>
    </section>
  );
}