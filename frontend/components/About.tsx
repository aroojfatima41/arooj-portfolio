'use client';

export default function About() {
  const specs = [
    { label: 'Experience', value: '7+ years' },
    { label: 'Core stack', value: 'React, TypeScript, Next.js' },
    { label: 'Now building', value: 'FastAPI, AI/ML systems' },
    { label: 'Foundation', value: 'B.Sc. Electrical Engineering, NUST' },
  ];

  return (
    <section id="about" className="section-rule relative px-6 py-28 md:py-36">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-5 md:gap-16">
        {/* Left: narrative */}
        <div className="md:col-span-3">
          <p className="section-kicker mb-4">
            About
          </p>
          <h2 className="font-display mb-6 text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-ink md:text-6xl">
            I started in circuits. I still think in systems.
          </h2>
          <p className="mb-4 max-w-2xl font-body text-lg leading-relaxed text-muted md:text-xl">
            My engineering foundation started with an Electrical Engineering degree,
            understanding how systems connect at their lowest level. That instinct carried
            into 7+ years building production frontend systems, from micro-frontend
            architectures to full product platforms.
          </p>
          <p className="max-w-2xl font-body text-lg leading-relaxed text-muted md:text-xl">
            I am now extending that same systems thinking into the backend and AI layer,
            building the infrastructure that powers intelligent applications, not just the
            interfaces on top of them.
          </p>
        </div>

        {/* Right: spec block */}
        <div className="md:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-panel/70 p-2 font-mono text-sm shadow-[0_18px_50px_rgba(0,0,0,0.16)]">
            {specs.map((spec, i) => (
              <div
                key={spec.label}
                className={`flex flex-col gap-2 rounded-xl px-4 py-4 ${
                  i !== specs.length - 1 ? 'border-b border-copper/10' : ''
                }`}
              >
                <span className="text-muted">{spec.label}</span>
                <span className="text-left text-ink md:text-right">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}