'use client';

import { useEffect, useRef, useState, type PointerEvent } from 'react';
import Link from 'next/link';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';

const stackLayers = [
  {
    label: 'Frontend',
    items: ['React', 'TypeScript', 'Next.js', 'JavaScript', 'Micro-frontends', 'Jest'],
    featured: true,
  },
  {
    label: 'Architecture',
    items: ['Nx', 'Single-SPA', 'Webpack 5', 'Microservices', 'Kafka', 'Temporal'],
  },
  {
    label: 'Backend and AI',
    items: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'Embeddings', 'Groq', 'Docker'],
  },
];
const stats = [
  {
    label: 'Years experience',
    finalValue: '7+',
    target: 7,
    format: (value: number) => (value >= 7 ? '7+' : String(value)),
  },
  {
    label: 'Test coverage',
    finalValue: '90%+',
    target: 90,
    format: (value: number) => `${value}%${value >= 90 ? '+' : ''}`,
  },
  {
    label: 'Engineers led',
    finalValue: '6-7',
    target: 7,
    format: (value: number) => (value >= 7 ? '6-7' : String(value)),
  },
  {
    label: 'Microservices built',
    finalValue: '6',
    target: 6,
    format: (value: number) => String(value),
  },
];

const headlineVariants: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.2, staggerChildren: 0.08 },
  },
};

const headlineWordVariants: Variants = {
  hidden: { opacity: 0, y: '0.65em' },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: 'easeOut' },
  },
};

const layerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const technologyVariants: Variants = {
  hidden: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
};

function AnimatedStat({
  stat,
  reducedMotion,
}: {
  stat: (typeof stats)[number];
  reducedMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(stat.finalValue);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!inView || reducedMotion || hasStarted.current) return;

    hasStarted.current = true;
    let controls: ReturnType<typeof animate> | undefined;
    const timeout = window.setTimeout(() => {
      setValue(stat.format(0));
      controls = animate(0, stat.target, {
        duration: 1.2,
        ease: 'easeOut',
        onUpdate: (latest) => setValue(stat.format(Math.round(latest))),
      });
    }, 900);

    return () => {
      window.clearTimeout(timeout);
      controls?.stop();
    };
  }, [inView, reducedMotion, stat]);

  return (
    <div ref={ref} className="min-w-0 px-3 py-2 sm:px-4">
      <p className="min-h-7 font-mono text-[9px] uppercase leading-snug tracking-[0.1em] text-muted sm:text-[10px]">
        {stat.label}
      </p>
      <p className="mt-1 min-h-9 min-w-[5ch] font-display text-2xl font-semibold leading-none tabular-nums text-ink sm:text-3xl">
        {value}
      </p>
    </div>
  );
}

function HeroStats({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <motion.div
      role="group"
      aria-label="Career highlights"
      className="mt-6 grid grid-cols-2 gap-x-2 gap-y-2 border-t border-white/10 pt-4 xl:grid-cols-4"
      initial={reducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.3, delay: reducedMotion ? 0 : 0.9 }}
    >
      {stats.map((stat) => (
        <AnimatedStat key={stat.label} stat={stat} reducedMotion={reducedMotion} />
      ))}
    </motion.div>
  );
}

function StackCard({ reducedMotion }: { reducedMotion: boolean }) {
  const cardRef = useRef<HTMLElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);
  const spotlightOpacity = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 150, damping: 22, mass: 0.5 });
  const smoothY = useSpring(pointerY, { stiffness: 150, damping: 22, mass: 0.5 });
  const smoothSpotlightX = useSpring(spotlightX, { stiffness: 110, damping: 24 });
  const smoothSpotlightY = useSpring(spotlightY, { stiffness: 110, damping: 24 });
  const smoothSpotlightOpacity = useSpring(spotlightOpacity, { stiffness: 100, damping: 24 });
  const rotateX = useTransform(smoothY, [-1, 1], [4, -4]);
  const rotateY = useTransform(smoothX, [-1, 1], [-4, 4]);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (reducedMotion || event.pointerType !== 'mouse' || !cardRef.current) return;
    const bounds = cardRef.current.getBoundingClientRect();
    const normalizedX = (event.clientX - bounds.left) / bounds.width;
    const normalizedY = (event.clientY - bounds.top) / bounds.height;
    pointerX.set(normalizedX * 2 - 1);
    pointerY.set(normalizedY * 2 - 1);
    spotlightX.set(event.clientX - bounds.left - 160);
    spotlightY.set(event.clientY - bounds.top - 160);
    spotlightOpacity.set(0.55);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
    spotlightOpacity.set(0);
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, x: 24 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 90, damping: 18, delay: 0.4 },
    },
  };

  return (
    <motion.section
      ref={cardRef}
      id="stack"
      aria-labelledby="core-stack-title"
      className="relative isolate overflow-hidden rounded-3xl border border-[#38BDF8]/25 bg-gradient-to-br from-[#0EA5E9]/10 via-panel/90 to-[#7C3AED]/10 p-4 shadow-[0_20px_60px_rgba(14,165,233,0.10)] sm:p-5"
      style={reducedMotion ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
      variants={cardVariants}
      initial={reducedMotion ? false : 'hidden'}
      animate="visible"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.18),rgba(124,58,237,0.08)_38%,transparent_72%)] blur-xl"
        style={{ x: smoothSpotlightX, y: smoothSpotlightY, opacity: smoothSpotlightOpacity }}
      />

      <div className="relative z-10">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[#7DD3FC]">How I build</p>
            <h2 id="core-stack-title" className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">Core tech stack</h2>
          </div>
          <span className="hidden rounded-full border border-[#38BDF8]/25 bg-[#38BDF8]/10 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[#7DD3FC] sm:inline-flex">Frontend · systems · AI</span>
        </div>

        <div className="relative space-y-2.5">
          <div aria-hidden="true" className="absolute bottom-7 left-[1.05rem] top-7 w-px bg-gradient-to-b from-[#38BDF8]/50 via-[#7C3AED]/45 to-[#38BDF8]/25" />
          {stackLayers.map((layer, index) => (
            <motion.div
              key={layer.label}
              variants={layerVariants}
              initial={reducedMotion ? false : 'hidden'}
              animate="visible"
              className={`relative rounded-2xl border p-3 pl-10 sm:p-3.5 sm:pl-11 ${layer.featured ? 'border-[#38BDF8]/35 bg-[#0EA5E9]/10' : 'border-white/10 bg-[#080F1F]/45'}`}
            >
              <span aria-hidden="true" className={`absolute left-2.5 top-4 flex h-5 w-5 items-center justify-center rounded-full border font-mono text-[8px] ${layer.featured ? 'border-[#38BDF8]/50 bg-[#0B1427] text-[#7DD3FC]' : 'border-white/15 bg-[#0B1427] text-muted'}`}>
                0{index + 1}
              </span>
              <p className={`mb-2 font-mono text-[9px] uppercase tracking-[0.16em] ${layer.featured ? 'text-[#7DD3FC]' : 'text-muted'}`}>{layer.label}</p>
              <div className="flex flex-wrap gap-1.5">
                {layer.items.map((item) => (
                  <motion.span
                    key={item}
                    variants={technologyVariants}
                    className={`rounded-full border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.04em] sm:text-[10px] ${layer.featured ? 'border-[#38BDF8]/25 bg-[#080F1F]/70 text-ink' : 'border-white/10 bg-white/[0.03] text-[#C7D2E4]'}`}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default function Hero() {
  const reducedMotionPreference = useReducedMotion();
  const reducedMotion = reducedMotionPreference === true;
  const { scrollY } = useScroll();
  const scrollCueOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  return (
    <section id="about" className="hero-grid relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden px-5 pb-14 pt-24 sm:px-8 sm:pt-24 sm:pb-12 lg:px-10 lg:pt-20 lg:pb-10">
      <div aria-hidden="true" className="hero-orb hero-orb-one pointer-events-none absolute -left-28 top-8 -z-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.20),rgba(56,189,248,0.04)_45%,transparent_72%)] blur-3xl sm:h-96 sm:w-96" />
      <div aria-hidden="true" className="hero-orb hero-orb-two pointer-events-none absolute -right-28 bottom-0 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.18),rgba(124,58,237,0.04)_48%,transparent_72%)] blur-3xl sm:h-[26rem] sm:w-[26rem]" />

      <div className="mx-auto grid w-full max-w-5xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="max-w-2xl">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.3, delay: reducedMotion ? 0 : 0.1, ease: 'easeOut' }}
            className="mb-4 flex flex-wrap items-center gap-3 sm:mb-5"
          >
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-signal sm:text-sm">AROOJ FATIMA</p>
            <span className="inline-flex min-h-8 items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/[0.08] px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-emerald-200 sm:text-[11px]">
              <span aria-hidden="true" className="hero-status-dot h-2 w-2 rounded-full bg-emerald-300" />
              Open to new roles
            </span>
          </motion.div>

          <motion.h1
            aria-label="Senior Frontend Engineer"
            variants={headlineVariants}
            initial={reducedMotion ? false : 'hidden'}
            animate="visible"
            className="font-display text-[clamp(2.25rem,6vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-ink sm:text-6xl lg:text-[clamp(3rem,3.5vw,3.75rem)]"
          >
            <span className="block whitespace-nowrap" aria-hidden="true">
              <span className="mr-[0.18em] inline-block overflow-hidden pb-[0.06em]">
                <motion.span className="inline-block" variants={headlineWordVariants}>Senior</motion.span>
              </span>
              <span className="inline-block overflow-hidden pb-[0.06em]">
                <motion.span className="inline-block" variants={headlineWordVariants}>Frontend</motion.span>
              </span>
            </span>
            <span className="mt-1 block overflow-hidden pb-[0.06em] bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] bg-clip-text text-transparent" aria-hidden="true">
              <motion.span className="relative inline-block" variants={headlineWordVariants}>
                Engineer.
                {!reducedMotion && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] to-[#38BDF8] bg-clip-text text-transparent"
                    animate={{ opacity: [0, 0.55, 0] }}
                    transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    Engineer.
                  </motion.span>
                )}
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reducedMotion ? 0 : 0.3, delay: reducedMotion ? 0 : 0.6 }}
            className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:mt-5 sm:text-lg"
          >
            I lead frontend delivery for enterprise products, and build the backend and AI systems behind them.
          </motion.p>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reducedMotion ? 0 : 0.3, delay: reducedMotion ? 0 : 0.75 }}
            className="mt-5 flex flex-col gap-3 min-[420px]:flex-row sm:mt-6"
          >
            <Link
              href="/projects/smart-hire"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0EA5E9] to-[#7C3AED] px-4 py-3 font-sans text-sm font-semibold text-white shadow-[0_8px_28px_rgba(37,99,235,0.22)] transition-shadow hover:shadow-[0_10px_34px_rgba(124,58,237,0.34)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1427] sm:px-5"
            >
              Explore my backend project
              <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <HeroStats reducedMotion={reducedMotion} />
        </div>

        <StackCard reducedMotion={reducedMotion} />
      </div>

      {!reducedMotion && (
        <motion.div
          aria-hidden="true"
          className="absolute bottom-3 left-1/2 hidden -translate-x-1/2 text-[#9AA8BE] sm:block"
          style={{ opacity: scrollCueOpacity }}
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={17} />
        </motion.div>
      )}
    </section>
  );
}
