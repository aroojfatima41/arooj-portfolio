'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import { ArrowRight, Check, CircleDashed, RotateCw } from 'lucide-react';
import {
  smartHireDecisions,
  smartHireCopy,
  smartHirePipeline,
  smartHireProject,
  smartHireServices,
  smartHireStats,
  smartHireStatusGroups,
  smartHireTechGroups,
} from '@/libs/smartHire';

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const pipelineVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.4 } },
};

const statusVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={reducedMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={revealVariants}
      transition={{ delay: reducedMotion ? 0 : delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const reducedMotion = useReducedMotion();
  const [counts, setCounts] = useState<number[]>(smartHireStats.map(() => 0));

  useEffect(() => {
    if (!inView || reducedMotion) return;

    let frame = 0;
    let startTime = 0;
    const duration = 1300;
    const tick = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCounts(smartHireStats.map((stat) => Math.round(stat.value * eased)));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [inView, reducedMotion]);

  return (
    <motion.div
      ref={ref}
      role="group"
      aria-label={smartHireCopy.statsLabel}
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: reducedMotion ? 0 : 0.35 }}
      className="grid grid-cols-2 gap-3 border-y border-white/10 py-5 sm:grid-cols-4 sm:gap-4 sm:py-6"
    >
      {smartHireStats.map((stat, index) => {
        const count = counts[index] ?? 0;
        const visualValue = stat.label === 'Match score'
          ? `0 to ${count}`
          : `${count}${stat.suffix}`;
        return (
          <div key={stat.label} className="min-w-0 px-2 py-1 sm:px-3">
            <p className="min-h-8 font-mono text-[10px] uppercase leading-snug tracking-[0.12em] text-muted">{stat.label}</p>
            <p aria-hidden="true" className="mt-1 min-h-9 min-w-[7ch] font-display text-2xl font-semibold leading-none tabular-nums text-ink sm:text-3xl">
              {reducedMotion ? stat.final : visualValue}
            </p>
            <span className="sr-only">{stat.final} {stat.label}</span>
          </div>
        );
      })}
    </motion.div>
  );
}

function ApplicationPipeline({ activeService }: { activeService: string | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const desktopTrackRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reducedMotion = useReducedMotion();
  const packetPosition = useMotionValue(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [replayKey, setReplayKey] = useState(0);
  const hasPlayed = useRef(false);
  const played = inView || reducedMotion === true;

  useEffect(() => {
    if (!inView || reducedMotion || hasPlayed.current) return;
    hasPlayed.current = true;
    const horizontal = window.matchMedia('(min-width: 1024px)').matches;
    const track = horizontal ? desktopTrackRef.current : mobileTrackRef.current;
    if (!track) return;
    const bounds = track.getBoundingClientRect();
    const distance = Math.max(0, horizontal ? bounds.width - 10 : bounds.height - 10);
    const controls = animate(packetPosition, distance, { duration: 3, ease: 'linear' });
    return () => controls.stop();
  }, [inView, reducedMotion, packetPosition, replayKey]);

  const replay = () => {
    hasPlayed.current = false;
    packetPosition.set(0);
    setReplayKey((key) => key + 1);
  };

  return (
    <section aria-labelledby="flow-title" className="mt-8 sm:mt-10">
      <Reveal>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-kicker mb-3">{smartHireCopy.flowEyebrow}</p>
            <h2 id="flow-title" className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{smartHireCopy.flowTitle}</h2>
          </div>
          <button
            type="button"
            onClick={replay}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/15 px-3 text-sm font-medium text-[#D7DFEF] hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]"
          >
            <RotateCw size={15} aria-hidden="true" /> {smartHireCopy.flowReplay}
          </button>
        </div>
      </Reveal>

      <div ref={ref} className="relative">
        <div className="relative hidden lg:block">
          <div ref={desktopTrackRef} aria-hidden="true" className="absolute left-[7.1%] right-[7.1%] top-[1.125rem] h-px bg-white/10">
            <motion.span key={`desktop-line-${replayKey}`} className="absolute inset-0 origin-left bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6]" initial={{ scaleX: 0 }} animate={{ scaleX: played ? 1 : 0 }} transition={{ duration: reducedMotion ? 0 : 3, ease: 'linear' }} />
            {!reducedMotion && <motion.span key={`desktop-packet-${replayKey}`} className="absolute -left-1.5 top-[-5px] h-3 w-3 rounded-full bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] shadow-[0_0_18px_rgba(56,189,248,0.85)]" style={{ x: packetPosition }} />}
          </div>
          <motion.ol key={`desktop-steps-${replayKey}`} variants={pipelineVariants} initial={reducedMotion ? false : 'hidden'} animate={played ? 'visible' : 'hidden'} className="relative grid grid-cols-7 gap-2">
            {smartHirePipeline.map((step, index) => {
              const highlighted = activeService !== null && step.serviceIds.includes(activeService);
              const active = activeIndex === index;
              return (
                <motion.li key={step.label} variants={revealVariants} className="min-w-0 text-center">
                  <button
                    type="button"
                    aria-expanded={active}
                    aria-controls="pipeline-step-detail"
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex((current) => current === index ? null : index)}
                    className="group relative z-10 flex w-full flex-col items-center rounded-xl px-1 pb-2 pt-0.5 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]"
                  >
                    <span className={`relative mb-2 flex h-9 w-9 items-center justify-center rounded-full border bg-[#0B1427] font-mono text-[10px] text-ink transition-none ${active || highlighted ? 'border-[#7DD3FC]' : 'border-white/20'}`}>
                      <span aria-hidden="true" className={`absolute -inset-1 rounded-full bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] blur-md ${played && (active || highlighted || index === 0) ? 'opacity-45' : 'opacity-0'}`} />
                      <span className="relative">0{index + 1}</span>
                    </span>
                    <span className="min-h-10 text-xs font-semibold leading-snug text-ink">{step.label}</span>
                    <span className="mt-1 max-w-full truncate rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[9px] text-muted">{step.service}</span>
                  </button>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>

        <div className="relative lg:hidden">
          <div ref={mobileTrackRef} aria-hidden="true" className="absolute bottom-8 left-[1.125rem] top-5 w-px bg-white/10">
            <motion.span key={`mobile-line-${replayKey}`} className="absolute inset-0 origin-top bg-gradient-to-b from-[#38BDF8] to-[#8B5CF6]" initial={{ scaleY: 0 }} animate={{ scaleY: played ? 1 : 0 }} transition={{ duration: reducedMotion ? 0 : 3, ease: 'linear' }} />
            {!reducedMotion && <motion.span key={`mobile-packet-${replayKey}`} className="absolute -left-[5px] -top-1.5 h-3 w-3 rounded-full bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] shadow-[0_0_18px_rgba(56,189,248,0.85)]" style={{ y: packetPosition }} />}
          </div>
          <motion.ol key={`mobile-steps-${replayKey}`} variants={pipelineVariants} initial={reducedMotion ? false : 'hidden'} animate={played ? 'visible' : 'hidden'} className="relative space-y-1">
            {smartHirePipeline.map((step, index) => {
              const highlighted = activeService !== null && step.serviceIds.includes(activeService);
              const active = activeIndex === index;
              return (
                <motion.li key={step.label} variants={revealVariants} className="min-w-0">
                  <button
                    type="button"
                    aria-expanded={active}
                    aria-controls="pipeline-step-detail"
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex((current) => current === index ? null : index)}
                    className="group relative flex min-h-[4.5rem] w-full items-center gap-4 rounded-xl px-1 py-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]"
                  >
                    <span className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-[#0B1427] font-mono text-[10px] text-ink ${active || highlighted ? 'border-[#7DD3FC]' : 'border-white/20'}`}>
                      <span aria-hidden="true" className={`absolute -inset-1 rounded-full bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] blur-md ${played && (active || highlighted || index === 0) ? 'opacity-45' : 'opacity-0'}`} />
                      <span className="relative">0{index + 1}</span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-ink">{step.label}</span>
                      <span className="mt-1 inline-block max-w-full truncate rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[9px] text-muted">{step.service}</span>
                    </span>
                  </button>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>

        <div id="pipeline-step-detail" aria-live="polite" className="mt-4 min-h-[3.5rem] rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm leading-relaxed text-[#C7D2E4]">
          {activeIndex === null ? smartHireCopy.flowSelectPrompt : smartHirePipeline[activeIndex].detail}
        </div>
      </div>
    </section>
  );
}

function ServicesGrid({ onActiveServiceChange }: { onActiveServiceChange: (id: string | null) => void }) {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();
  const setActive = (id: string) => {
    const next = selectedService === id ? null : id;
    setSelectedService(next);
    onActiveServiceChange(next);
  };

  return (
    <section aria-labelledby="services-title" className="mt-10 sm:mt-12">
      <Reveal>
        <div className="mb-5">
          <p className="section-kicker mb-3">{smartHireCopy.servicesEyebrow}</p>
          <h2 id="services-title" className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{smartHireCopy.servicesTitle}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{smartHireCopy.servicesHint}</p>
        </div>
      </Reveal>
      <motion.div variants={listVariants} initial={reducedMotion ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.12 }} className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {smartHireServices.map((service) => {
          const selected = selectedService === service.id;
          return (
            <motion.button
              key={service.id}
              type="button"
              variants={revealVariants}
              aria-pressed={selected}
              onClick={() => setActive(service.id)}
              onMouseEnter={() => onActiveServiceChange(service.id)}
              onMouseLeave={() => onActiveServiceChange(selectedService)}
              onFocus={() => onActiveServiceChange(service.id)}
              onBlur={() => onActiveServiceChange(selectedService)}
              whileHover={reducedMotion ? undefined : { y: -2 }}
              className={`group relative min-h-36 overflow-hidden rounded-2xl border bg-[#0B1427]/60 p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC] ${selected ? 'border-[#38BDF8]/50' : 'border-white/10'}`}
            >
              <span aria-hidden="true" className={`pointer-events-none absolute inset-0 bg-gradient-to-br from-[#38BDF8]/10 to-[#8B5CF6]/10 transition-opacity duration-200 ${selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
              <span className="relative flex items-start justify-between gap-3">
                <span className="font-display text-lg font-semibold text-ink">{service.name}</span>
                <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-[#C7D2E4]">{service.badge}</span>
              </span>
              <span className="relative mt-3 block text-sm leading-relaxed text-muted">{service.responsibility}</span>
            </motion.button>
          );
        })}
      </motion.div>
    </section>
  );
}

function StatusBoard() {
  const reducedMotion = useReducedMotion();
  return (
    <section aria-labelledby="status-title" className="mt-10 sm:mt-12">
      <Reveal>
        <div className="mb-5">
          <p className="section-kicker mb-3">{smartHireCopy.statusEyebrow}</p>
          <h2 id="status-title" className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{smartHireCopy.statusTitle}</h2>
        </div>
      </Reveal>
      <div className="grid gap-3 lg:grid-cols-2">
        {smartHireStatusGroups.map((group) => (
          <motion.section
            key={group.heading}
            aria-label={group.heading}
            variants={statusVariants}
            initial={reducedMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="rounded-2xl border border-white/10 bg-[#0B1427]/45 p-3.5 sm:p-4"
          >
            <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-[#7DD3FC]">{group.heading}</h3>
            <ul className="grid gap-x-6 gap-y-3 lg:grid-cols-2">
              {group.items.map((item) => {
                const implemented = item.status === 'implemented';
                return (
                  <motion.li key={item.label} variants={revealVariants} className="flex items-start gap-3 text-sm leading-relaxed text-[#D7DFEF]">
                    <span aria-hidden="true" className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${implemented ? 'bg-emerald-300/15 text-emerald-200' : 'border border-dashed border-amber-200/70 text-amber-100'}`}>
                      {implemented ? <Check size={13} strokeWidth={2.5} /> : <CircleDashed size={13} />}
                    </span>
                    <span className="min-w-0 flex-1">{item.label}<span className={`ml-2 inline-block whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.08em] ${implemented ? 'text-emerald-200' : 'text-amber-100'}`}>{implemented ? smartHireCopy.implementedLabel : smartHireCopy.inProgressLabel}</span></span>
                  </motion.li>
                );
              })}
            </ul>
          </motion.section>
        ))}
      </div>
    </section>
  );
}

function DecisionsGrid() {
  const reducedMotion = useReducedMotion();
  return (
    <section aria-labelledby="decisions-title" className="mt-10 sm:mt-12">
      <Reveal>
        <div className="mb-5">
          <p className="section-kicker mb-3">{smartHireCopy.decisionsEyebrow}</p>
          <h2 id="decisions-title" className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{smartHireCopy.decisionsTitle}</h2>
        </div>
      </Reveal>
      <motion.div variants={listVariants} initial={reducedMotion ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.12 }} className="grid gap-3 md:grid-cols-2">
        {smartHireDecisions.map((item) => (
          <motion.article key={item.problem} variants={revealVariants} className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 sm:p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">{smartHireCopy.problemLabel}</p>
            <h3 className="mt-2 font-display text-base font-semibold leading-snug text-ink">{item.problem}</h3>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-[#7DD3FC]">{smartHireCopy.decisionLabel}</p>
            <p className="mt-2 text-sm leading-relaxed text-[#C7D2E4]">{item.decision}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function TechGroups() {
  return (
    <section aria-labelledby="tech-title" className="mt-10 border-t border-white/10 pt-6 sm:mt-12">
      <Reveal>
        <h2 id="tech-title" className="font-display text-xl font-semibold text-ink">{smartHireCopy.technologyTitle}</h2>
        <div className="mt-4 space-y-3">
          {smartHireTechGroups.map((group) => (
            <div key={group.heading} className="flex flex-col gap-2 sm:flex-row sm:items-start">
              <h3 className="w-32 shrink-0 pt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">{group.heading}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] text-[#D7DFEF]">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export default function SmartHireCaseStudy({ homepage = false }: { homepage?: boolean }) {
  const [activeService, setActiveService] = useState<string | null>(null);
  const Heading = homepage ? 'h2' : 'h1';

  return (
    <section id="smart-hire" className="section-rule px-5 pb-12 pt-8 text-ink sm:px-8 sm:pb-14 sm:pt-10 lg:px-10">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#38BDF8]/20 bg-[linear-gradient(135deg,rgba(14,165,233,0.10),rgba(18,27,46,0.82)_42%,rgba(9,14,23,0.95))] p-4 shadow-[0_24px_70px_rgba(14,165,233,0.08)] sm:p-6 lg:p-8">
        <Reveal>
          <header className="mb-5 sm:mb-6">
            <p className="section-kicker mb-3">{smartHireProject.eyebrow}</p>
            <Heading className="font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">{smartHireProject.title}</Heading>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#C7D2E4] sm:text-lg">{smartHireProject.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {smartHireProject.chips.map((chip) => (
                <span key={chip} className="rounded-full border border-[#38BDF8]/25 bg-[#38BDF8]/[0.08] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[#BAE6FD]">{chip}</span>
              ))}
            </div>
          </header>
        </Reveal>

        <StatsStrip />
        <ApplicationPipeline activeService={activeService} />
        <ServicesGrid onActiveServiceChange={setActiveService} />
        <StatusBoard />
        <DecisionsGrid />
        <TechGroups />

        <Reveal>
          <footer className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
            <p className="max-w-xl text-sm leading-relaxed text-muted">{smartHireCopy.contactPrompt}</p>
            <Link href="/#contact" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-gradient-to-r from-[#0EA5E9] to-[#7C3AED] px-4 py-2 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1427]">
              {smartHireCopy.contactLink} <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </footer>
        </Reveal>
      </div>
    </section>
  );
}
