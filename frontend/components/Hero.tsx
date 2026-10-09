'use client';

import { motion } from 'framer-motion';

const stackGroups = [
  {
    label: 'Frontend core',
    items: ['React', 'TypeScript', 'Next.js', 'Angular', 'Micro-frontends'],
    featured: true,
  },
  {
    label: 'Architecture & systems',
    items: ['Nx', 'Single-SPA', 'Webpack 5', 'Microservices', 'Docker', 'Temporal'],
  },
  {
    label: 'AI & delivery',
    items: ['FastAPI', 'Kafka', 'PostgreSQL', 'Embeddings', 'Vector search', 'LLM integration', 'Jest', 'CI/CD'],
  },
];

const headlineVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.18,
    },
  },
};

const headlineWordVariants = {
  hidden: { opacity: 0, y: '0.7em' },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  return (
    <section id="about" className="hero-grid relative isolate flex min-h-[92vh] items-center overflow-hidden px-6 pb-20 pt-32 md:pt-36">
      <div className="hero-glow absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_28%_40%,_rgba(217,143,79,0.16),_transparent_42%),radial-gradient(ellipse_at_82%_78%,_rgba(94,234,212,0.10),_transparent_35%)]" />

      <div className="mx-auto max-w-6xl space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <p className="font-mono text-sm uppercase tracking-[0.22em] text-signal">
              Arooj Fatima
            </p>
            <span className="inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-signal">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
              Available
            </span>
          </div>

          <motion.h1
            aria-label="Senior Frontend Engineer"
            variants={headlineVariants}
            initial="hidden"
            animate="visible"
            className="font-display text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-ink md:text-7xl lg:text-8xl"
          >
            <span className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em]" aria-hidden="true">
              <motion.span className="inline-block" variants={headlineWordVariants}>Senior</motion.span>
            </span>
            <span className="inline-block overflow-hidden pb-[0.08em]" aria-hidden="true">
              <motion.span className="inline-block" variants={headlineWordVariants}>Frontend</motion.span>
            </span>
            <span className="mt-2 block overflow-hidden pb-[0.08em] bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] bg-clip-text text-transparent" aria-hidden="true">
              <motion.span className="inline-block" variants={headlineWordVariants}>Engineer.</motion.span>
            </span>
          </motion.h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
            I lead frontend delivery for enterprise products, with 7+ years across React, TypeScript,
            and micro-frontend architecture. AI and backend systems are a growing part of how I build,
            alongside the frontend work that has been my foundation.
          </p>

        </motion.div>

        <motion.section
          id="stack"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
          aria-labelledby="core-stack-title"
          className="rounded-3xl border border-[#38BDF8]/25 bg-gradient-to-br from-[#0EA5E9]/10 via-panel/80 to-[#7C3AED]/10 p-5 shadow-[0_16px_50px_rgba(14,165,233,0.08)] md:p-7"
        >
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#7DD3FC]">The tools behind the work</p>
              <h2 id="core-stack-title" className="font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">Core tech stack</h2>
            </div>
            <span className="rounded-full border border-[#38BDF8]/25 bg-[#38BDF8]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#7DD3FC]">Frontend focused · systems capable</span>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {stackGroups.map((group) => (
              <div key={group.label} className={`rounded-2xl border p-4 ${group.featured ? 'border-[#38BDF8]/35 bg-[#0EA5E9]/10' : 'border-white/10 bg-white/[0.03]'}`}>
                <h3 className={`mb-3 font-mono text-[10px] uppercase tracking-[0.14em] ${group.featured ? 'text-[#7DD3FC]' : 'text-muted'}`}>{group.label}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className={`rounded-full border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.06em] ${group.featured ? 'border-[#38BDF8]/25 bg-[#080F1F]/70 text-ink' : 'border-white/10 bg-white/[0.03] text-muted'}`}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </section>
  );
}
