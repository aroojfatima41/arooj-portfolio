'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../libs/projects';

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(17,25,40,0.9),rgba(9,14,23,0.9))] p-6 shadow-[0_18px_35px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-copper/40 md:p-8"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-copper/80 to-transparent" />

      <div className="project-architecture mb-8" aria-hidden="true">
        <span className="project-node project-node-one" />
        <span className="project-node project-node-two" />
        <span className="project-node project-node-three" />
        <span className="project-line project-line-one" />
        <span className="project-line project-line-two" />
      </div>

      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-signal">
          {project.tagline}
        </span>
        <span className="font-mono text-xs text-muted">0{index + 1}</span>
      </div>

      <h3 className="font-display text-3xl font-semibold text-ink">{project.name}</h3>
      <p className="mt-4 text-base leading-relaxed text-muted">{project.summary}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-copper/25 bg-copper/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-copper"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
          Product + architecture
        </span>
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-signal transition-colors duration-200 group-hover:text-copper"
        >
          View case study
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const featuredProjects = projects.filter(
    (project) => project.slug !== 'smart-hire-architecture-overview',
  );

  return (
    <section id="work" className="section-rule relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker">Selected work</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] text-ink md:text-6xl">
              Projects that shaped my craft.
            </h2>
          </div>

          <p className="max-w-lg text-base leading-relaxed text-muted">
            I build products that combine clean UX, backend depth, and AI-enabled workflows to solve real-world problems.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}