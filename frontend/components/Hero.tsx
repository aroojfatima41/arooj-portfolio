'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowDownRight, ArrowRight } from 'lucide-react';

const expertise = [
  {
    level: 'Core expertise',
    title: 'Frontend engineering',
    detail: 'React · TypeScript · Next.js · Micro-frontends',
    primary: true,
  },
  {
    level: 'Systems depth',
    title: 'Backend workflows',
    detail: 'Microservices · Docker · Temporal',
    primary: false,
  },
  {
    level: 'Supporting capability',
    title: 'Applied AI',
    detail: 'Embeddings · Vector search · LLM integration',
    primary: false,
  },
];

export default function Hero() {
  return (
    <section id="about" className="hero-grid relative isolate flex min-h-[92vh] items-center overflow-hidden px-6 pb-20 pt-32 md:pt-36">
      <div className="hero-glow absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_28%_40%,_rgba(217,143,79,0.16),_transparent_42%),radial-gradient(ellipse_at_82%_78%,_rgba(94,234,212,0.10),_transparent_35%)]" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <p className="mb-5 font-mono text-sm uppercase tracking-[0.22em] text-signal">
            Arooj Fatima
          </p>

          <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-ink md:text-7xl lg:text-8xl">
            Senior Frontend
            <span className="mt-2 block bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] bg-clip-text text-transparent">Engineer.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
            I lead frontend delivery for enterprise products, with 7+ years across React, TypeScript,
            and micro-frontend architecture. AI and backend systems are a growing part of how I build,
            alongside the frontend work that has been my foundation.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <div className="flex flex-wrap gap-3">
              <Link
                href="#projects"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#7C3AED] px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-white shadow-[0_8px_24px_rgba(37,99,235,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(124,58,237,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA]"
              >
                View my work
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link
                href="#experience"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#38BDF8]/60 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-[#7DD3FC] transition-colors duration-200 hover:border-[#A78BFA] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA]"
              >
                Explore experience
                <ArrowDownRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="mt-8 space-y-3" aria-label="Expertise">
            {expertise.map((area) => (
              <div key={area.title} className={`flex flex-col gap-1 border-l-2 pl-4 sm:flex-row sm:items-baseline sm:gap-4 ${area.primary ? 'border-signal' : 'border-white/15'}`}>
                <span className={`min-w-36 font-mono text-[9px] uppercase tracking-[0.14em] ${area.primary ? 'text-signal' : 'text-muted'}`}>
                  {area.level}
                </span>
                <span className={`font-medium ${area.primary ? 'text-ink' : 'text-ink/85'}`}>
                  {area.title}
                </span>
                <span className="text-sm text-muted">{area.detail}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: 'easeOut' }}
          className="relative"
        >
          <div className="rounded-3xl border border-white/10 bg-panel/75 p-6 shadow-[0_0_30px_rgba(217,143,79,0.08)] backdrop-blur-sm md:p-8">
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-signal">Current focus</span>
              <span className="rounded-full border border-signal/30 bg-signal/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-signal">
                Available
              </span>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Experience</p>
                <p className="mt-3 text-3xl font-semibold text-ink">7+ Years</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Stack</p>
                  <p className="mt-3 text-lg font-medium text-ink">Frontend + Systems</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Approach</p>
                  <p className="mt-3 text-lg font-medium text-ink">Product-first</p>
                </div>
              </div>

              <div className="rounded-2xl border border-copper/20 bg-copper/5 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-copper">Build strength</p>
                <p className="mt-3 text-base leading-relaxed text-ink/90">
                  Leading frontend delivery, with the backend and distributed-systems depth to build complete products.
                </p>
              </div>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}