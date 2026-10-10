'use client';

import { useCallback, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent } from 'react';
import Image from 'next/image';
import { useInView, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

const recommendations = [
  { name: 'Yumna Abbasi', src: '/recommendations/yumna-abbasi.png', width: 997, height: 430 },
  { name: 'Gul Sicka Khan', src: '/recommendations/gul-sicka-khan.png', width: 1017, height: 367 },
  { name: 'Khizar Khan', src: '/recommendations/khizar-khan.png', width: 991, height: 778 },
  { name: 'Muhammad Aneeq', src: '/recommendations/muhammad-aneeq.png', width: 1006, height: 795 },
  { name: 'Sarwan Ahmed', src: '/recommendations/sarwan-ahmed.png', width: 1033, height: 820 },
  { name: 'Shah Zain', src: '/recommendations/shah-zain.png', width: 999, height: 483 },
];

export default function Recommendations() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLAnchorElement>(null);
  const dragStart = useRef<{ x: number; scrollLeft: number } | null>(null);
  const didDrag = useRef(false);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [stepSize, setStepSize] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const isVisible = useInView(viewportRef, { amount: 0.15 });
  const maxIndex = stepSize > 0 ? Math.ceil(maxOffset / stepSize) : 0;

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const firstCard = firstCardRef.current;
    if (!viewport || !track || !firstCard) return;
    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    const nextStepSize = cardWidth + gap;
    const nextMaxOffset = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    setStepSize(nextStepSize);
    setMaxOffset(nextMaxOffset);
    const nextMaxIndex = nextStepSize > 0 ? Math.ceil(nextMaxOffset / nextStepSize) : 0;
    activeIndexRef.current = Math.min(activeIndexRef.current, nextMaxIndex);
    setActiveIndex((index) => Math.min(index, nextMaxIndex));
  }, []);

  useEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (viewportRef.current) observer.observe(viewportRef.current);
    if (trackRef.current) observer.observe(trackRef.current);
    return () => observer.disconnect();
  }, [measure]);

  const navigateTo = useCallback((index: number) => {
    const nextIndex = Math.max(0, Math.min(maxIndex, index));
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
    viewportRef.current?.scrollTo({
      left: Math.min(nextIndex * stepSize, maxOffset),
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }, [maxIndex, maxOffset, prefersReducedMotion, stepSize]);

  useEffect(() => {
    if (isPaused || prefersReducedMotion || !isVisible) return;
    const intervalId = window.setInterval(() => {
      const current = activeIndexRef.current;
      navigateTo(current >= maxIndex ? 0 : current + 1);
    }, 8000);
    return () => window.clearInterval(intervalId);
  }, [isPaused, isVisible, maxIndex, navigateTo, prefersReducedMotion]);

  function updateFromScroll() {
    if (!stepSize) return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    const nextIndex = Math.min(maxIndex, Math.round(viewport.scrollLeft / stepSize));
    activeIndexRef.current = nextIndex;
    setActiveIndex((index) => index === nextIndex ? index : nextIndex);
  }

  function startMouseDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    dragStart.current = { x: event.clientX, scrollLeft: viewport.scrollLeft };
    didDrag.current = false;
  }

  function moveMouseDrag(event: ReactPointerEvent<HTMLDivElement>) {
    const start = dragStart.current;
    const viewport = viewportRef.current;
    if (!start || !viewport) return;
    const delta = event.clientX - start.x;
    if (!didDrag.current && Math.abs(delta) < 5) return;
    if (!didDrag.current) {
      didDrag.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    viewport.scrollLeft = start.scrollLeft - delta;
    event.preventDefault();
  }

  function endMouseDrag() {
    dragStart.current = null;
  }

  function preventClickAfterDrag(event: ReactMouseEvent<HTMLDivElement>) {
    if (!didDrag.current) return;
    event.preventDefault();
    event.stopPropagation();
    didDrag.current = false;
  }

  function showPrevious() {
    const current = activeIndexRef.current;
    navigateTo(current <= 0 ? maxIndex : current - 1);
  }

  function showNext() {
    const current = activeIndexRef.current;
    navigateTo(current >= maxIndex ? 0 : current + 1);
  }

  return (
    <section id="recommendations" className="section-rule px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker mb-3">Recommendations</p>
            <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">In my colleagues’ words.</h2>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted" aria-live="polite">
            {String(Math.min(activeIndex + 1, recommendations.length)).padStart(2, '0')} / {String(recommendations.length).padStart(2, '0')}
          </p>
        </div>

        <div
          ref={viewportRef}
          role="region"
          className="recommendations-viewport snap-x snap-mandatory cursor-grab overflow-x-auto active:cursor-grabbing"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsPaused(false);
          }}
          onScroll={updateFromScroll}
          onPointerDown={startMouseDrag}
          onPointerMove={moveMouseDrag}
          onPointerUp={endMouseDrag}
          onPointerCancel={endMouseDrag}
          onClickCapture={preventClickAfterDrag}
          aria-roledescription="carousel"
          aria-label="LinkedIn recommendations"
        >
          <div ref={trackRef} className="flex w-max gap-4">
            {recommendations.map((recommendation, index) => (
              <a
                key={recommendation.name}
                ref={index === 0 ? firstCardRef : undefined}
                href={recommendation.src}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open full-size LinkedIn recommendation from ${recommendation.name}`}
                title={`Open full-size screenshot from ${recommendation.name}`}
                className={`block w-[82vw] shrink-0 snap-start overflow-hidden rounded-xl border border-white/15 bg-white shadow-[0_16px_40px_rgba(0,0,0,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC] sm:w-[56vw] md:w-[40vw] md:max-w-[460px] ${index === activeIndex ? 'ring-1 ring-[#38BDF8]/50' : ''}`}
              >
                <Image
                  src={recommendation.src}
                  alt={`LinkedIn recommendation screenshot written by ${recommendation.name}`}
                  width={recommendation.width}
                  height={recommendation.height}
                  sizes="(min-width: 768px) 40vw, (min-width: 640px) 56vw, 82vw"
                  className="block h-auto w-full select-none"
                  draggable={false}
                  priority={index < 4}
                />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">Drag or use the arrows to browse</p>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Previous recommendations"
              className="rounded-full border border-white/10 p-2 text-muted hover:border-signal/50 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
            >
              <ChevronLeft size={17} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Next recommendations"
              className="rounded-full border border-white/10 p-2 text-muted hover:border-signal/50 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
            >
              <ChevronRight size={17} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setIsPaused((paused) => !paused)}
              aria-label={isPaused || prefersReducedMotion ? 'Play automatic carousel' : 'Pause automatic carousel'}
              className="rounded-full border border-white/10 p-2 text-muted hover:border-signal/50 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
            >
              {isPaused || prefersReducedMotion ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
