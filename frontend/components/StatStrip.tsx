'use client';

import { motion } from 'framer-motion';

const stats = [
  { value: '7+', label: 'years in engineering' },
  { value: '90%+', label: 'test coverage' },
  { value: '6–7', label: 'engineers led' },
  { value: '6', label: 'services in Smart Hire' },
];

export default function StatStrip() {
  return (
    <section aria-label="Career highlights" className="section-rule border-b border-white/10 px-6 py-6 md:py-8">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-6 md:grid-cols-4 md:gap-y-0">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className={`px-4 first:pl-0 md:px-6 ${index > 0 ? 'md:border-l md:border-white/10' : ''}`}
          >
            <p className="font-display text-2xl font-semibold leading-none text-ink md:text-3xl">
              {stat.value}
            </p>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted md:text-[10px]">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}