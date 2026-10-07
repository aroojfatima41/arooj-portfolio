'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const highlights = [
  '90%+ test coverage',
  '6–7 engineers led',
  'Performance optimization',
  'Enterprise-scale architecture',
];

const screenshots = [
  {
    title: 'Network Services',
    src: '/extreme-networks/network-services.jpeg',
    alt: 'Extreme Networks network services dashboard screenshot',
  },
  {
    title: 'Applications',
    src: '/extreme-networks/applications.jpeg',
    alt: 'Extreme Networks applications dashboard screenshot',
  },
  {
    title: 'Dashboard',
    src: '/extreme-networks/dashboard.jpeg',
    alt: 'Extreme Networks dashboard screenshot',
  },
  {
    title: 'Policy Editor',
    src: '/extreme-networks/policy.jpeg',
    alt: 'Extreme Networks policy editor screenshot',
  },
];

export default function FlagshipCaseStudy({ embedded = false }: { embedded?: boolean }) {
  return (
    <section className={embedded ? 'mt-20 border-t border-white/10 pt-16' : 'section-rule px-6 py-24 md:py-32'}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center gap-3">
          <span className="section-kicker">Flagship case study</span>
          <span className="h-px w-12 bg-copper/60" aria-hidden="true" />
        </div>

        <div className="overflow-hidden rounded-3xl border border-copper/25 bg-[linear-gradient(135deg,rgba(217,143,79,0.10),rgba(18,27,46,0.82)_42%,rgba(9,14,23,0.95))] p-6 md:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-copper">
                Extreme Networks (via Emumba)
              </p>
              <h2 className="font-display text-4xl font-semibold leading-[1] tracking-[-0.04em] text-ink md:text-6xl">
                Enterprise Security Platform
              </h2>
              <p className="mt-5 font-mono text-xs uppercase tracking-[0.14em] text-signal">
                Micro-frontend architecture at scale
              </p>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
                A large-scale enterprise security platform composed of independently deployable micro-frontends.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['React 18', 'TypeScript', 'Nx', 'Single-SPA', 'Webpack 5'].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-copper/25 bg-copper/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-copper"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="min-h-28 rounded-2xl border border-white/10 bg-black/15 p-5"
                >
                  <span className="font-mono text-xs text-copper">0{index + 1}</span>
                  <p className="mt-8 font-display text-lg font-medium leading-tight text-ink">
                    {highlight}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-6 xl:grid-cols-2">
            {screenshots.map((screenshot, index) => (
              <motion.figure
                key={screenshot.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="overflow-hidden rounded-2xl border border-white/10 bg-[#101a2b] shadow-[0_20px_80px_rgba(2,6,15,0.45)]"
              >
                <div className="relative aspect-[1.35] w-full overflow-hidden bg-[#111b2b]">
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1280px) 100vw, 50vw"
                    priority={index < 2}
                  />
                </div>
                <figcaption className="border-t border-white/10 bg-[#0f1725] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-copper">
                  {screenshot.title}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
