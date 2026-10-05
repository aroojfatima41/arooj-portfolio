'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowDownRight, ArrowRight } from 'lucide-react';

const focusAreas = ['Frontend architecture', 'AI product interfaces', 'Design systems', 'System design'];

export default function Hero() {
  return (
    <section className="hero-grid relative isolate flex min-h-[92vh] items-center overflow-hidden px-6 pb-20 pt-32 md:pt-36">
      <div className="hero-glow absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(217,143,79,0.16),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(94,234,212,0.12),_transparent_28%)]" />

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
            <span className="mt-2 block text-copper">Engineer.</span>
          </h1>

          <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-ink/80 md:text-sm">
            React · TypeScript · Micro Frontends · AI
          </p>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
            I build scalable enterprise interfaces and AI-powered products, with 7+ years of experience turning complex systems into reliable, intuitive experiences.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#work"
              className="inline-flex items-center gap-2 rounded-xl bg-copper px-4 py-3 font-mono text-xs uppercase tracking-[0.14em] text-[#0b1220] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
            >
              View my work
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <Link
              href="#experience"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-3 font-mono text-xs uppercase tracking-[0.14em] text-ink transition-colors duration-200 hover:border-signal/50 hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
            >
              Explore experience
              <ArrowDownRight size={15} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-3" aria-label="Areas of focus">
            {focusAreas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-copper/30 bg-white/[0.02] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink/90"
              >
                {area}
              </span>
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
                  <p className="mt-3 text-lg font-medium text-ink">Frontend + AI</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Approach</p>
                  <p className="mt-3 text-lg font-medium text-ink">Product-first</p>
                </div>
              </div>

              <div className="rounded-2xl border border-copper/20 bg-copper/5 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-copper">Build strength</p>
                <p className="mt-3 text-base leading-relaxed text-ink/90">
                  Shipping high-quality interfaces with backend awareness, AI integration, and scalable architecture thinking.
                </p>
              </div>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}