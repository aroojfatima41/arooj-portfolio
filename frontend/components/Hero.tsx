'use client';

import { motion } from 'framer-motion';

const focusAreas = ['Frontend architecture', 'AI product interfaces', 'Design systems', 'System design'];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-6 pt-20 pb-16 md:pt-28 md:pb-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(217,143,79,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(94,234,212,0.14),_transparent_28%)]" />

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

          <h1 className="font-display text-5xl font-semibold leading-[0.95] text-ink md:text-6xl lg:text-7xl">
            Frontend Engineer
            <span className="mt-2 block text-copper">wired for AI.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
            Building high-impact digital products with a strong product lens, backend depth, and a focus on AI-driven experiences.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
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
          <div className="rounded-3xl border border-copper/20 bg-panel/80 p-6 shadow-[0_0_30px_rgba(217,143,79,0.08)] backdrop-blur-sm md:p-8">
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