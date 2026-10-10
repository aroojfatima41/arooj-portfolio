'use client';

import Image from 'next/image';
import { AnimatePresence, LayoutGroup, animate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type Variants } from 'framer-motion';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { Fragment, useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { EXPERIENCE_CHAPTERS, type ExperienceChapterData, type ExperienceMedia, type ExperienceMetric } from '@/libs/experience';

// The chapter order follows the progression named in the section heading.
const CAREER_PATH = [...EXPERIENCE_CHAPTERS].reverse();

const chapterVariants: Variants = {
  hidden: (index: number) => ({
    opacity: 0,
    x: index === 0 ? -12 : 12,
    y: index === 2 ? 18 : 24,
  }),
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut', delay: index === 0 ? 0 : index === 1 ? 0.16 : 0.28 },
  }),
};

type LightboxSelection = {
  media: ExperienceMedia;
  trigger: HTMLButtonElement;
};

function useFinePointer() {
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)');
    const update = () => setFinePointer(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return finePointer;
}

function CountUpMetric({ metric, reduced }: { metric: ExperienceMetric; reduced: boolean }) {
  const valueRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(valueRef, { once: true, amount: 0.75 });

  useEffect(() => {
    if (reduced || !inView || metric.countTo === undefined || !valueRef.current) return;

    const node = valueRef.current;
    const controls = animate(0, metric.countTo, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (value) => {
        node.textContent = `${metric.prefix ?? ''}${Math.round(value)}${metric.suffix ?? ''}`;
      },
      onComplete: () => {
        node.textContent = metric.value;
      },
    });

    return () => controls.stop();
  }, [inView, metric, reduced]);

  return (
    <span
      ref={valueRef}
      aria-label={metric.value}
      className="block min-h-[1.05em] font-display text-2xl font-semibold tabular-nums tracking-tight text-ink sm:text-3xl"
    >
      {metric.value}
    </span>
  );
}

function MetricsPanel({ metrics, reduced }: { metrics: ExperienceMetric[]; reduced: boolean }) {
  const columns = metrics.length === 3 ? 'grid-cols-1 sm:grid-cols-3' : metrics.length === 2 ? 'grid-cols-2' : 'grid-cols-1 sm:max-w-[50%]';

  return (
    <dl
      aria-label="Career metrics"
      className={`mt-4 grid ${columns} divide-y divide-white/10 rounded-xl border border-white/10 bg-white/[0.035] p-2 backdrop-blur-xl sm:mt-4 sm:p-2 sm:divide-y-0 sm:divide-x`}
    >
      {metrics.map((metric, index) => (
        <div key={metric.label} className={`flex min-w-0 flex-col px-2 py-2 sm:px-3 sm:py-2 ${index === 0 ? 'sm:pl-2' : ''}`}>
          <dt className="order-2 mt-1 text-xs leading-snug text-[#B8C5D8] sm:text-sm">{metric.label}</dt>
          <dd className="order-1 m-0">
            <CountUpMetric metric={metric} reduced={reduced} />
          </dd>
          {metric.detail && <dd className="order-3 m-0 mt-1 text-[11px] leading-snug text-[#91A7C1] sm:text-xs">{metric.detail}</dd>}
        </div>
      ))}
    </dl>
  );
}

function ChapterMetrics({ chapter, reduced }: { chapter: ExperienceChapterData; reduced: boolean }) {
  return <MetricsPanel metrics={chapter.metrics} reduced={reduced} />;
}

function TiltMedia({
  media,
  index,
  reduced,
  finePointer,
  onOpen,
}: {
  media: ExperienceMedia;
  index: number;
  reduced: boolean;
  finePointer: boolean;
  onOpen: (media: ExperienceMedia, trigger: HTMLButtonElement) => void;
}) {
  const canTilt = finePointer && !reduced;
  const restingX = index % 2 === 0 ? -0.1 : 0.1;
  const pointerX = useMotionValue(restingX);
  const pointerY = useMotionValue(-0.08);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 24 });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 24 });

  const handlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!canTilt || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerEnter = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (canTilt && event.pointerType === 'mouse') {
      pointerX.set(0);
      pointerY.set(0);
    }
  };

  const handlePointerLeave = () => {
    pointerX.set(restingX);
    pointerY.set(-0.08);
  };

  return (
    <motion.button
      type="button"
      data-experience-motion
      initial={reduced ? false : { opacity: 0, y: 12, scale: 0.98 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.07 }}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={(event) => onOpen(media, event.currentTarget)}
      style={{ rotateX: canTilt ? rotateX : 0, rotateY: canTilt ? rotateY : 0, transformPerspective: 1200 }}
      aria-label={`Open ${media.title} screenshot`}
      className="group relative block w-[82vw] max-w-[22rem] shrink-0 snap-start overflow-hidden rounded-xl bg-[#101A2C] text-left shadow-[0_14px_34px_rgba(0,0,0,0.28)] outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC] sm:w-[58vw] lg:w-full"
    >
      <span className="relative block aspect-[16/10] overflow-hidden bg-white/5">
        <Image
          src={media.src}
          alt={media.alt}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 82vw, (max-width: 1023px) 58vw, 28vw"
          className={`object-cover object-top ${reduced ? '' : 'transition-transform duration-300 [@media(hover:hover)]:group-hover:scale-[1.025]'}`}
        />
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08111F]/75 via-transparent to-transparent opacity-70" />
      </span>
      <span className="block px-3 py-2 font-mono text-[11px] text-[#D7DFEF]">{media.title}</span>
    </motion.button>
  );
}

function ProofGallery({
  media,
  reduced,
  finePointer,
  onOpen,
}: {
  media: ExperienceMedia[];
  reduced: boolean;
  finePointer: boolean;
  onOpen: (media: ExperienceMedia, trigger: HTMLButtonElement) => void;
}) {
  if (!media.length) return null;

  const columns = media.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3';

  return (
    <div className={`mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-3 [scrollbar-width:thin] [scrollbar-color:rgba(125,211,252,0.35)_transparent] lg:grid lg:overflow-visible ${columns}`}>
      {media.map((item, index) => (
        <TiltMedia key={item.src} media={item} index={index} reduced={reduced} finePointer={finePointer} onOpen={onOpen} />
      ))}
    </div>
  );
}

function ExperienceLightbox({
  selection,
  onClose,
}: {
  selection: LightboxSelection;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion() === true;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      requestAnimationFrame(() => {
        if (selection.trigger.isConnected) selection.trigger.focus();
      });
    };
  }, [onClose, selection.trigger]);

  return createPortal(
    <motion.div
      data-experience-motion
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduced ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.18, ease: 'easeOut' }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[100] grid place-items-center bg-[#030712]/90 p-4 backdrop-blur-md"
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={selection.media.title}
        tabIndex={-1}
        initial={reduced ? false : { opacity: 0, y: 12, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduced ? { opacity: 1 } : { opacity: 0, y: 8, scale: 0.99 }}
        transition={{ duration: reduced ? 0 : 0.2, ease: 'easeOut' }}
        className="relative w-full max-w-5xl rounded-2xl bg-[#101A2C] p-3 shadow-[0_30px_100px_rgba(0,0,0,0.55)] focus:outline-none sm:p-4"
      >
        <div className="mb-3 flex items-center justify-between gap-4 px-1">
          <p className="font-mono text-xs text-[#D7DFEF]">{selection.media.title}</p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close screenshot viewer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]"
          >
            <X aria-hidden="true" size={20} />
          </button>
        </div>
        <div className="relative mx-auto aspect-[16/10] max-h-[78vh] w-full overflow-hidden rounded-xl bg-black/30">
          <Image src={selection.media.src} alt={selection.media.alt} fill sizes="(max-width: 1024px) 94vw, 80vw" className="object-contain" />
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}

function ExperienceChapter({
  chapter,
  index,
  reduced,
  finePointer,
  onActivate,
  onOpenMedia,
}: {
  chapter: ExperienceChapterData;
  index: number;
  reduced: boolean;
  finePointer: boolean;
  onActivate: (index: number) => void;
  onOpenMedia: (media: ExperienceMedia, trigger: HTMLButtonElement) => void;
}) {
  const chapterRef = useRef<HTMLElement>(null);
  const isActive = useInView(chapterRef, { margin: '-40% 0px -40% 0px' });
  const { scrollYProgress } = useScroll({ target: chapterRef, offset: ['start end', 'end start'] });
  const yearY = useTransform(scrollYProgress, [0, 1], [38, -38]);
  const glow = index === 0
    ? 'radial-gradient(ellipse at 72% 20%, rgba(45,212,191,0.15), transparent 58%)'
    : index === 1
      ? 'radial-gradient(ellipse at 28% 24%, rgba(96,165,250,0.14), transparent 58%)'
      : 'radial-gradient(ellipse at 70% 18%, rgba(139,92,246,0.14), transparent 58%)';

  useEffect(() => {
    if (isActive) onActivate(index);
  }, [index, isActive, onActivate]);

  return (
    <motion.article
      ref={chapterRef}
      id={chapter.id}
      custom={index}
      variants={chapterVariants}
      initial={reduced ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      data-experience-motion
      className="relative isolate scroll-mt-28 border-b border-white/10 py-7 last:border-b-0 sm:py-9 lg:py-10"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-8 -top-10 -z-10 h-72 blur-3xl"
        style={{ background: glow }}
        animate={{ opacity: reduced ? 0.16 : isActive ? 0.65 : 0.18 }}
        transition={{ duration: reduced ? 0 : 0.7, ease: 'easeOut' }}
      />
      <motion.span
        aria-hidden="true"
        style={{ y: reduced || !finePointer ? 0 : yearY }}
        className="pointer-events-none absolute right-0 top-1 select-none font-display text-[clamp(7rem,15vw,13rem)] font-bold leading-none tracking-[-0.09em] text-transparent opacity-[0.06] [-webkit-text-stroke:1px_rgba(203,213,225,0.7)]"
      >
        {chapter.year}
      </motion.span>

      <div className="relative z-10">
        <header className="relative max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#7DD3FC]">{chapter.company}</p>
          <h3 className="mt-1.5 max-w-3xl font-display text-2xl font-semibold leading-tight tracking-[-0.025em] text-ink sm:text-3xl lg:text-4xl">
            {chapter.role}
          </h3>
        </header>

        <ChapterMetrics chapter={chapter} reduced={reduced} />

        <ul className="mt-4 max-w-3xl space-y-2 text-sm leading-relaxed text-[#C7D2E4] sm:mt-5 sm:text-[15px]">
          {chapter.bullets.map((bullet, bulletIndex) => (
            <motion.li
              key={bullet}
              data-experience-motion
              initial={reduced ? false : { opacity: 0, y: 8 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.55 }}
              transition={{ duration: 0.32, delay: reduced ? 0 : bulletIndex * 0.055, ease: 'easeOut' }}
              className="flex items-start gap-3"
            >
              <span aria-hidden="true" className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-[#5EEAD4] to-[#60A5FA]" />
              <span>{bullet}</span>
            </motion.li>
          ))}
        </ul>

        {chapter.details.length > 0 && (
          <div className="mt-2 max-w-3xl space-y-1 text-sm leading-relaxed text-[#AEBBD0]">
            {chapter.details.map((detail) => (
              <p key={detail}>{detail}</p>
            ))}
          </div>
        )}

        <ul aria-label={`${chapter.company} technologies`} className="mt-6 flex flex-wrap gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.06em] text-[#A9BAD0] sm:mt-7 sm:text-xs">
          {chapter.tech.map((tech, techIndex) => (
            <motion.li
              key={tech}
              data-experience-motion
              initial={reduced ? false : { opacity: 0, y: 8 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.24, delay: reduced ? 0 : techIndex * 0.045, ease: 'easeOut' }}
              className="transition-colors duration-200 hover:text-[#7DD3FC]"
            >
              {tech}
            </motion.li>
          ))}
        </ul>

        {chapter.screenshots && (
          <ProofGallery media={chapter.screenshots} reduced={reduced} finePointer={finePointer} onOpen={onOpenMedia} />
        )}

        {chapter.website && (
          <div className="mt-5">
            <p className="max-w-3xl text-xs leading-relaxed text-[#AEBBD0] sm:text-sm">
              {chapter.website.sentence}{' '}
              <a
                href={chapter.website.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-sky-200 underline decoration-sky-200/40 underline-offset-4 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]"
              >
                {chapter.website.label}
              </a>
            </p>
            <ProofGallery media={chapter.website.screenshots} reduced={reduced} finePointer={finePointer} onOpen={onOpenMedia} />
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function Experience() {
  const reduced = useReducedMotion() === true;
  const finePointer = useFinePointer();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const [lightbox, setLightbox] = useState<LightboxSelection | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 120px', 'end end'] });
  const railProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.35 });

  const setActive = useCallback((index: number) => {
    setActiveChapter((current) => current === index ? current : index);
  }, []);

  const openMedia = useCallback((media: ExperienceMedia, trigger: HTMLButtonElement) => {
    setLightbox({ media, trigger });
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const jumpToChapter = (index: number) => {
    setActiveChapter(index);
    document.getElementById(CAREER_PATH[index].id)?.scrollIntoView({
      behavior: reduced ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-labelledby="experience-heading"
      className="section-rule relative px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 max-w-4xl sm:mb-14">
          <p className="section-kicker mb-3">Experience</p>
          <h2 id="experience-heading" className="font-display text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-4xl lg:text-5xl">
            From developer to lead
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#B8C5D8] sm:text-base">
            Seven years, three roles, one thread: building frontends that scale.
          </p>
          <motion.span
            aria-hidden="true"
            initial={reduced ? false : { scaleX: 0 }}
            whileInView={reduced ? undefined : { scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduced ? 0 : 0.6, ease: 'easeOut' }}
            className="mt-5 block h-px w-20 origin-left bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6]"
          />
        </header>

        <div className="sticky top-16 z-30 -mx-5 mb-5 border-y border-white/10 bg-[#0B1427]/90 px-5 py-2 backdrop-blur-xl lg:hidden sm:-mx-8 sm:px-8">
          <div className="mb-1.5 flex items-center justify-between gap-3">
            <span className="truncate text-xs font-medium text-[#D7DFEF]">{CAREER_PATH[activeChapter].company}</span>
            <span className="shrink-0 font-mono text-[10px] text-[#8EA0BA]">{activeChapter + 1} / {CAREER_PATH.length}</span>
          </div>
          <div aria-hidden="true" className="h-px overflow-hidden bg-white/10">
            <motion.span className="block h-full origin-left bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6]" style={{ scaleX: reduced ? 1 : railProgress }} />
          </div>
        </div>

        <LayoutGroup id="experience-navigation">
          <div className="grid items-stretch gap-x-10 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)] xl:gap-x-16">
            {CAREER_PATH.map((chapter, index) => {
              const active = activeChapter === index;
              const completed = activeChapter > index;

              return (
                <Fragment key={chapter.id}>
                  <aside aria-label={`${chapter.level} at ${chapter.company}`} className="relative hidden border-b border-white/10 py-7 lg:block">
                    <span aria-hidden="true" className="absolute bottom-0 left-[7px] top-0 w-px bg-white/10" />
                    <motion.span
                      aria-hidden="true"
                      className="absolute left-[6px] top-0 h-full w-[2px] origin-top bg-gradient-to-b from-[#38BDF8] via-[#60A5FA] to-[#8B5CF6] shadow-[0_0_10px_rgba(96,165,250,0.6)]"
                      style={{ scaleY: reduced || completed ? 1 : active ? railProgress : 0 }}
                    />
                    <button
                      type="button"
                      aria-controls={chapter.id}
                      aria-current={active ? 'step' : undefined}
                      onClick={() => jumpToChapter(index)}
                      className="group relative flex w-full items-start gap-4 rounded-lg py-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]"
                    >
                      <span className="relative mt-1 grid h-4 w-4 shrink-0 place-items-center">
                        {active && (
                          <motion.span
                            layoutId="experience-active-node"
                            transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 28 }}
                            className="absolute inset-[-5px] rounded-full border border-[#7DD3FC]/65 bg-[#38BDF8]/10 shadow-[0_0_18px_rgba(56,189,248,0.24)]"
                          />
                        )}
                        <span className={`relative h-2.5 w-2.5 rounded-full border ${active ? 'border-[#7DD3FC] bg-[#7DD3FC] shadow-[0_0_10px_rgba(56,189,248,0.8)]' : 'border-[#66758D] bg-[#0B1427]'}`} />
                      </span>
                      <span className="min-w-0">
                        <span className={`block font-display text-base font-semibold ${active ? 'text-ink' : 'text-[#97A6BB]'}`}>{chapter.level}</span>
                        <span className={`mt-0.5 block truncate text-sm ${active ? 'text-[#C7D2E4]' : 'text-[#7E8CA2]'}`}>{chapter.company}</span>
                        <span className="mt-1 block font-mono text-[10px] tracking-[0.04em] text-[#8292A9]">{chapter.railYears}</span>
                      </span>
                    </button>
                  </aside>

                  <ExperienceChapter
                    chapter={chapter}
                    index={index}
                    reduced={reduced}
                    finePointer={finePointer}
                    onActivate={setActive}
                    onOpenMedia={openMedia}
                  />
                </Fragment>
              );
            })}
          </div>
        </LayoutGroup>
      </div>

      <AnimatePresence>
        {lightbox && <ExperienceLightbox key={lightbox.media.src} selection={lightbox} onClose={closeLightbox} />}
      </AnimatePresence>
    </section>
  );
}
