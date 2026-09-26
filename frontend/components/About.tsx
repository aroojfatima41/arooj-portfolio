'use client';

import { motion } from 'framer-motion';

export default function About() {
  const specs = [
    { label: 'Experience', value: '7+ years' },
    { label: 'Core stack', value: 'React, TypeScript, Next.js' },
    { label: 'Now building', value: 'FastAPI, AI/ML systems' },
    { label: 'Foundation', value: 'B.Sc. Electrical Engineering, NUST' },
  ];

  return (
    <section className="relative py-32 px-6 border-t border-panel">
      <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-12">
        {/* Left: narrative */}
        <div className="md:col-span-3">
          <p className="font-mono text-signal text-sm tracking-widest uppercase mb-4">
            About
          </p>
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-ink mb-6 leading-snug">
            I started in circuits. I still think in systems.
          </h2>
          <p className="font-body text-muted text-lg leading-relaxed mb-4">
            My engineering foundation started with an Electrical Engineering degree,
            understanding how systems connect at their lowest level. That instinct carried
            into 7+ years building production frontend systems, from micro-frontend
            architectures to full product platforms.
          </p>
          <p className="font-body text-muted text-lg leading-relaxed">
            I'm now extending that same systems thinking into the backend and AI layer,
            building the infrastructure that powers intelligent applications, not just the
            interfaces on top of them.
          </p>
        </div>

        {/* Right: spec block */}
        <div className="md:col-span-2">
          <div className="bg-panel rounded-lg border border-copper/20 p-6 font-mono text-sm">
            {specs.map((spec, i) => (
              <div
                key={spec.label}
                className={`flex justify-between py-3 ${
                  i !== specs.length - 1 ? 'border-b border-copper/10' : ''
                }`}
              >
                <span className="text-muted">{spec.label}</span>
                <span className="text-ink text-right">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}