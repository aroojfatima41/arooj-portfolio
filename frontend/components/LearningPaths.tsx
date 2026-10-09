import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../libs/projects';

const featuredProjects = projects.filter((project) =>
  ['smart-hire', 'angular-todo-app'].includes(project.slug),
);

export default function LearningPaths() {
  return (
    <section id="projects" className="section-rule px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <p className="section-kicker mb-4">Selected projects</p>
          <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">
            Project work
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            A selection of product and frontend work.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <article key={project.slug} className="flex h-full flex-col rounded-3xl border border-white/10 bg-panel/55 p-6 transition-colors hover:border-signal/30 md:p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-signal">
                {project.slug === 'smart-hire' ? 'AI recruitment platform' : 'Frontend experiment'}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-ink">{project.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{project.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.06em] text-muted">
                    {item}
                  </span>
                ))}
              </div>
              <Link
                href={`/projects/${project.slug}`}
                className="mt-auto inline-flex items-center gap-2 pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-signal transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
              >
                View project
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
