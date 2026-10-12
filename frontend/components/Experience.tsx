'use client';

import Image from 'next/image';
import { AnimatePresence, LayoutGroup, animate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Fragment, useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { EXPERIENCE_CHAPTERS, type ExperienceChapterData, type ExperienceMedia, type ExperienceMetric } from '@/libs/experience';
import ScreenshotLightbox, { type ScreenshotSelection } from '@/components/ScreenshotLightbox';

const CAREER_PATH = EXPERIENCE_CHAPTERS;

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
  gallery,
  reduced,
  finePointer,
  onOpen,
}: {
  media: ExperienceMedia;
  index: number;
  gallery: ExperienceMedia[];
  reduced: boolean;
  finePointer: boolean;
  onOpen: (media: ExperienceMedia[], index: number, trigger: HTMLButtonElement) => void;
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
      onClick={(event) => onOpen(gallery, index, event.currentTarget)}
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
  onOpen: (media: ExperienceMedia[], index: number, trigger: HTMLButtonElement) => void;
}) {
  if (!media.length) return null;

  return (
    <div className="mt-5 flex flex-wrap items-center gap-4">
      <TiltMedia media={media[0]} gallery={media} index={0} reduced={reduced} finePointer={finePointer} onOpen={onOpen} />
      {media.length > 1 && (
        <button
          type="button"
          onClick={(event) => onOpen(media, 0, event.currentTarget)}
          className="rounded-md py-2 text-sm font-medium text-sky-200 underline decoration-sky-200/40 underline-offset-4 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]"
        >
          View all screenshots ({media.length})
        </button>
      )}
    </div>
  );
}

function ExperienceChapter({
  chapter,
  index,
  expanded,
  onToggleDetails,
  reduced,
  finePointer,
  onActivate,
  onOpenMedia,
}: {
  chapter: ExperienceChapterData;
  index: number;
  expanded: boolean;
  onToggleDetails: (chapterId: string) => void;
  reduced: boolean;
  finePointer: boolean;
  onActivate: (index: number) => void;
  onOpenMedia: (media: ExperienceMedia[], index: number, trigger: HTMLButtonElement) => void;
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
          <p className="mt-2 font-mono text-xs text-[#91A7C1] sm:text-sm">{chapter.dateRange}</p>
        </header>

        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#C7D2E4] sm:text-[15px]">{chapter.headline}</p>
        <ChapterMetrics chapter={chapter} reduced={reduced} />

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#91A7C1]">Key contributions and proof</p>
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={`${chapter.id}-details`}
            onClick={() => onToggleDetails(chapter.id)}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg px-2 text-sm font-medium text-sky-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]"
          >
            {expanded ? 'Hide details' : 'See details'}
            <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: reduced ? 0 : 0.2 }}>
              <ChevronDown size={16} aria-hidden="true" />
            </motion.span>
          </button>
        </div>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              id={`${chapter.id}-details`}
              key={`${chapter.id}-details`}
              aria-hidden={!expanded}
              initial={reduced ? false : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={reduced ? { height: 0, opacity: 1 } : { height: 0, opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.34, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <motion.ul
                initial={reduced ? false : 'hidden'}
                animate="visible"
                variants={{ hidden: {}, visible: { transition: { delayChildren: reduced ? 0 : 0.12, staggerChildren: reduced ? 0 : 0.05 } } }}
                className="mt-3 max-w-3xl space-y-2 text-sm leading-relaxed text-[#C7D2E4] sm:text-[15px]"
              >
                {[...chapter.bullets.slice(1), ...chapter.details].map((bullet) => (
                  <motion.li
                    key={bullet}
                    variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.24, ease: 'easeOut' } } }}
                    className="flex items-start gap-3"
                  >
                    <span aria-hidden="true" className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-[#5EEAD4] to-[#60A5FA]" />
                    <span>{bullet}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <ul aria-label={`${chapter.company} technologies`} className="mt-4 flex flex-wrap gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.06em] text-[#A9BAD0] sm:text-xs">
                {chapter.tech.slice(0, 6).map((tech, techIndex) => (
                  <motion.li
                    key={tech}
                    initial={reduced ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduced ? 0 : 0.2, delay: reduced ? 0 : techIndex * 0.05 }}
                    className="transition-colors duration-200 hover:text-[#7DD3FC]"
                  >
                    {tech}
                  </motion.li>
                ))}
              </ul>

              {chapter.website && (
                <p className="mt-4 max-w-3xl text-xs leading-relaxed text-[#AEBBD0] sm:text-sm">
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
              )}

              {chapter.screenshots && (
                <motion.div
                  initial={reduced ? false : { opacity: 0, x: 18, rotateY: finePointer ? 5 : 0 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 150, damping: 20, delay: 0.16 }}
                  className="[transform-style:preserve-3d]"
                >
                  <ProofGallery
                    media={[...chapter.screenshots, ...(chapter.website?.screenshots ?? [])]}
                    reduced={reduced}
                    finePointer={finePointer}
                    onOpen={onOpenMedia}
                  />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

export default function Experience() {
  const reduced = useReducedMotion() === true;
  const finePointer = useFinePointer();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const [lightbox, setLightbox] = useState<ScreenshotSelection | null>(null);
  const [openChapters, setOpenChapters] = useState<Set<string>>(() => new Set());
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 120px', 'end end'] });
  const railProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.35 });

  const setActive = useCallback((index: number) => {
    setActiveChapter((current) => current === index ? current : index);
  }, []);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 1023px)');
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const toggleDetails = useCallback((chapterId: string) => {
    setOpenChapters((current) => {
      const next = new Set(current);
      if (next.has(chapterId)) {
        next.delete(chapterId);
      } else {
        if (isMobile) next.clear();
        next.add(chapterId);
      }
      return next;
    });
  }, [isMobile]);

  const openMedia = useCallback((media: ExperienceMedia[], index: number, trigger: HTMLButtonElement) => {
    setLightbox({ media, index, trigger });
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
      className="section-rule relative px-6 py-16 sm:px-9 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 max-w-4xl sm:mb-14">
          <p className="section-kicker mb-3">Experience</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <h2 id="experience-heading" className="font-display text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-4xl lg:text-5xl">Experience</h2>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[#9AA8BE]">Most recent first</span>
          </div>
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
                    expanded={isMobile
                      ? openChapters.has(chapter.id) && [...openChapters][0] === chapter.id
                      : openChapters.has(chapter.id)}
                    onToggleDetails={toggleDetails}
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
        {lightbox && <ScreenshotLightbox key={lightbox.media[lightbox.index].src} selection={lightbox} onClose={closeLightbox} />}
      </AnimatePresence>
    </section>
  );
}
