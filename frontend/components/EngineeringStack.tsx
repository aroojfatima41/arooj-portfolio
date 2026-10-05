'use client';

import { motion } from 'framer-motion';

const groups = [
  {
    label: 'Frontend',
    items: ['React', 'TypeScript', 'Next.js', 'JavaScript'],
  },
  {
    label: 'Architecture',
    items: ['Micro Frontends', 'Nx', 'Single-SPA', 'Webpack'],
  },
  {
    label: 'Quality',
    items: ['Jest', 'React Testing Library', 'CI/CD'],
  },
  {
    label: 'AI / Backend',
    items: ['FastAPI', 'PostgreSQL', 'pgvector', 'Kafka', 'Temporal', 'Groq LLM'],
  },
];

export default function EngineeringStack() {
  return (
    <section id="stack" className="section-rule px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <p className="section-kicker mb-4">Engineering stack</p>
          <h2 className="font-display text-4xl font-semibold tracking-[-0.03em] text-ink md:text-6xl">
            The tools behind the work.
          </h2>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {groups.map((group, index) => (
            <motion.article
              key={group.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="rounded-2xl border border-white/10 bg-panel/55 p-5 transition-colors duration-300 hover:border-copper/35"
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold text-ink">{group.label}</h3>
                <span className="font-mono text-[10px] text-muted">0{index + 1}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
