'use client';

import { motion } from 'framer-motion';

const stats = [
  { label: 'Experience', value: '7+ Years' },
  { label: 'Test Coverage', value: '90%+' },
  { label: 'Team Led', value: '6–7 Engineers' },
  { label: 'Systems Built', value: '6 Microservices' },
];

export default function StatStrip() {
  return (
    <section aria-label="Career highlights" className="section-rule border-b border-white/10 px-6 sm:px-8 lg:px-10 py-6 md:py-8">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-y-6 lg:grid-cols-4 lg:gap-y-0">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className={`px-4 first:pl-0 md:px-6 ${index % 2 === 1 ? 'md:border-l md:border-white/10' : ''} ${index > 0 ? 'lg:border-l lg:border-white/10' : ''}`}
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted md:text-[10px]">
              {stat.label}
            </p>
            <p className="mt-2 font-display text-lg font-semibold leading-tight text-ink sm:text-2xl md:text-3xl">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
