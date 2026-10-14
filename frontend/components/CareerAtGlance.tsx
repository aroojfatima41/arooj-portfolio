'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, motion, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform } from 'framer-motion';
import { GraduationCap, RotateCcw } from 'lucide-react';
import { EXPERIENCE_CHAPTERS } from '@/libs/experience';

type MilestoneMetric = {
  value: string;
  target: number;
  label: string;
  format: (value: number) => string;
};

const metricsByChapter: Record<string, MilestoneMetric> = {
  'experience-aera-technology': {
    value: '50%',
    target: 50,
    label: 'Faster builds',
    format: (value) => `${Math.round(value)}%`,
  },
  'experience-extreme-networks': {
    value: '6-7',
    target: 7,
    label: 'Engineers led',
    format: (value) => Math.round(value) >= 7 ? '6-7' : String(Math.round(value)),
  },
  'experience-emumba': {
    value: '4',
    target: 4,
    label: 'Integrations shipped',
    format: (value) => String(Math.round(value)),
  },
};

const milestones = [...EXPERIENCE_CHAPTERS].reverse().map((chapter) => ({
  id: chapter.id,
  year: chapter.railYears.split(' to ')[0],
  level: chapter.level,
  company: chapter.company,
  role: chapter.role,
  metric: metricsByChapter[chapter.id],
}));

const education = {
  degree: 'B.E. Electrical Engineering',
  institution: 'NUST CEME',
  honors: 'Gold Medal, FSC-1 and Runner-up, Best Final Year Project',
};

function Milestone({
  milestone,
  progress,
  threshold,
  reduced,
}: {
  milestone: (typeof milestones)[number];
  progress: ReturnType<typeof useMotionValue<number>>;
  threshold: number;
  reduced: boolean;
}) {
  const [arrived, setArrived] = useState(reduced);
  const [value, setValue] = useState(milestone.metric.value);
  const startedCount = useRef(false);

  useMotionValueEvent(progress, 'change', (latest) => {
    if (latest < threshold || arrived) return;
    setArrived(true);
    if (reduced || startedCount.current) return;

    startedCount.current = true;
    setValue(milestone.metric.format(0));
    animate(0, milestone.metric.target, {
      duration: 1,
      ease: 'easeOut',
      onUpdate: (latestValue) => setValue(milestone.metric.format(latestValue)),
      onComplete: () => setValue(milestone.metric.value),
    });
  });

  return (
    <a
      href={`#${milestone.id}`}
      className="group relative flex min-w-0 gap-3 rounded-2xl border border-white/10 bg-[#101B30]/70 p-3 transition-colors hover:border-[#38BDF8]/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC] md:min-h-[9.5rem] md:flex-col md:gap-1 md:p-4"
    >
      <span
        aria-hidden="true"
        className={`absolute left-[0.42rem] top-4 z-10 grid h-4 w-4 place-items-center rounded-full border bg-[#0B1427] transition-colors md:left-1/2 md:top-[-1.95rem] md:-translate-x-1/2 ${arrived ? 'border-[#7DD3FC] shadow-[0_0_14px_rgba(56,189,248,0.65)]' : 'border-[#64748B]'}`}
      >
        <motion.span
          className={`block h-1.5 w-1.5 rounded-full ${arrived ? 'bg-[#7DD3FC]' : 'bg-[#64748B]'}`}
          animate={arrived && !reduced ? { opacity: [0.7, 1, 0.8], scale: [1, 1.35, 1] } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.36, ease: 'easeOut' }}
        />
      </span>
      <div className="min-w-0 pl-3 md:pl-0">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#7DD3FC]">
          <span>{milestone.year}</span>
          <span aria-hidden="true" className="h-px w-5 bg-[#7DD3FC]/40" />
          <span>{milestone.level}</span>
        </div>
        <p className="mt-1 truncate font-display text-sm font-semibold text-ink sm:text-base">{milestone.company}</p>
        <p className="mt-2 font-display text-2xl font-semibold leading-none tabular-nums text-ink sm:text-3xl" aria-label={milestone.metric.value}>
          {value}
        </p>
        <p className="mt-1 text-xs text-[#AEBBD0]">{milestone.metric.label}</p>
      </div>
      <span className="sr-only">Jump to {milestone.role} experience</span>
    </a>
  );
}

export default function CareerAtGlance() {
  const sectionRef = useRef<HTMLElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const verticalTrackRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const educationButtonRef = useRef<HTMLButtonElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const reducedPreference = useReducedMotion();
  const reduced = reducedPreference === true;
  const progress = useMotionValue(reduced ? 1 : 0);
  const [activeIndex, setActiveIndex] = useState(reduced ? milestones.length - 1 : 0);
  const [runKey, setRunKey] = useState(0);
  const [isComplete, setIsComplete] = useState(reduced);
  const [educationOpen, setEducationOpen] = useState(false);
  const [horizontalTravel, setHorizontalTravel] = useState(0);
  const [verticalTravel, setVerticalTravel] = useState(0);
  const horizontalDotX = useTransform(progress, (latest) => latest * horizontalTravel);
  const verticalDotY = useTransform(progress, (latest) => latest * verticalTravel);

  useMotionValueEvent(progress, 'change', (latest) => {
    const nextIndex = latest < 0.25 ? 0 : latest < 0.75 ? 1 : 2;
    setActiveIndex((current) => current === nextIndex ? current : nextIndex);
  });

  useEffect(() => {
    const measure = () => {
      setHorizontalTravel(Math.max(0, (horizontalTrackRef.current?.clientWidth ?? 0) - 12));
      setVerticalTravel(Math.max(0, (verticalTrackRef.current?.clientHeight ?? 0) - 12));
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || reduced || isComplete) return;
    const controls = animate(progress, 1, {
      duration: 3.5,
      ease: 'linear',
      onComplete: () => setIsComplete(true),
    });
    return () => controls.stop();
  }, [isComplete, isInView, progress, reduced, runKey]);

  const replay = useCallback(() => {
    if (reduced) {
      progress.set(1);
      return;
    }
    progress.set(0);
    setActiveIndex(0);
    setIsComplete(false);
    setRunKey((key) => key + 1);
  }, [progress, reduced]);

  useEffect(() => {
    if (!educationOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (educationRef.current && !educationRef.current.contains(event.target as Node)) setEducationOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setEducationOpen(false);
        educationButtonRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [educationOpen]);

  const renderNodes = () => milestones.map((milestone, index) => (
    <Milestone
      key={`${milestone.id}-${runKey}`}
      milestone={milestone}
      progress={progress}
      threshold={[0.04, 0.5, 0.96][index]}
      reduced={reduced}
    />
  ));

  const activeMilestone = milestones[activeIndex];

  return (
    <section ref={sectionRef} id="career-at-a-glance" aria-labelledby="career-glance-heading" className="section-rule px-6 py-8 sm:px-9 sm:py-10 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="section-kicker mb-2">Career at a glance</p>
            <h2 id="career-glance-heading" className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">A clear path through frontend engineering</h2>
          </div>
          <div className="flex items-center gap-3">
            <div aria-live="polite" aria-atomic="true" className="min-h-7 overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={activeMilestone.level}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 1 } : { opacity: 0, y: -12 }}
                  transition={{ duration: reduced ? 0 : 0.22, ease: 'easeOut' }}
                  className="font-display text-lg font-semibold text-[#B9DDF6] sm:text-xl"
                >
                  {activeMilestone.level}
                </motion.p>
              </AnimatePresence>
            </div>
            <button
              type="button"
              onClick={replay}
              aria-label="Replay career timeline animation"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#B8C5D8] hover:border-[#38BDF8]/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]"
            >
              <RotateCcw size={15} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="relative hidden md:block">
          <div ref={horizontalTrackRef} aria-hidden="true" className="absolute left-[16.666%] right-[16.666%] top-[0.72rem] h-[2px] bg-white/10">
            <motion.span className="absolute inset-0 origin-left bg-gradient-to-r from-[#38BDF8] via-[#60A5FA] to-[#8B5CF6]" style={{ scaleX: reduced ? 1 : progress }} />
            {!reduced && <motion.span className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#5EEAD4] to-[#8B5CF6] shadow-[0_0_14px_rgba(96,165,250,0.9)]" style={{ x: horizontalDotX }} />}
          </div>
          <div className="grid grid-cols-3 gap-4 pt-7">{renderNodes()}</div>
        </div>

        <div className="relative md:hidden">
          <div ref={verticalTrackRef} aria-hidden="true" className="absolute bottom-4 left-[0.72rem] top-4 w-[2px] bg-white/10">
            <motion.span className="absolute inset-0 origin-top bg-gradient-to-b from-[#38BDF8] via-[#60A5FA] to-[#8B5CF6]" style={{ scaleY: reduced ? 1 : progress }} />
            {!reduced && <motion.span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-gradient-to-br from-[#5EEAD4] to-[#8B5CF6] shadow-[0_0_14px_rgba(96,165,250,0.9)]" style={{ y: verticalDotY }} />}
          </div>
          <div className="space-y-2 py-3">{renderNodes()}</div>
        </div>
        <div className="mt-3 flex justify-end">
          <EducationPopover
            open={educationOpen}
            reduced={reduced}
            setOpen={setEducationOpen}
            wrapperRef={educationRef}
            buttonRef={educationButtonRef}
          />
        </div>
      </div>
    </section>
  );
}

function EducationPopover({
  open,
  reduced,
  setOpen,
  wrapperRef,
  buttonRef,
}: {
  open: boolean;
  reduced: boolean;
  setOpen: (open: boolean) => void;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}) {
  return (
    <div ref={wrapperRef} className="relative inline-flex w-full justify-end md:w-auto">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="career-education-popover"
        onFocus={() => setOpen(true)}
        onClick={() => setOpen(true)}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#38BDF8]/25 bg-[#0F2037] px-3 py-2 text-left text-xs font-medium text-[#C7D2E4] hover:border-[#38BDF8]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]"
      >
        <GraduationCap size={15} aria-hidden="true" className="shrink-0 text-[#7DD3FC]" />
        <span>{education.degree}, {education.institution}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id="career-education-popover"
            role="dialog"
            aria-label="Education honors"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            transition={{ duration: reduced ? 0 : 0.16, ease: 'easeOut' }}
            className="absolute bottom-full right-0 z-20 mb-2 w-[min(20rem,calc(100vw-2.5rem))] rounded-xl border border-white/10 bg-[#111E33] p-3 text-xs leading-relaxed text-[#D7DFEF] shadow-xl md:bottom-auto md:top-full md:mt-2 md:mb-0"
          >
            {education.honors}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
