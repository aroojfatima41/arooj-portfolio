'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { createPortal } from 'react-dom';

export type ScreenshotItem = {
  title: string;
  src: string;
  alt: string;
};

export type ScreenshotSelection = {
  media: ScreenshotItem[];
  index: number;
  trigger: HTMLButtonElement;
};

export default function ScreenshotLightbox({
  selection,
  onClose,
}: {
  selection: ScreenshotSelection;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [activeIndex, setActiveIndex] = useState(selection.index);
  const reduced = useReducedMotion() === true;
  const media = selection.media[activeIndex];
  const hasMultiple = selection.media.length > 1;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === 'ArrowRight' && hasMultiple) {
        setActiveIndex((current) => (current + 1) % selection.media.length);
        return;
      }
      if (event.key === 'ArrowLeft' && hasMultiple) {
        setActiveIndex((current) => (current - 1 + selection.media.length) % selection.media.length);
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

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      requestAnimationFrame(() => {
        if (selection.trigger.isConnected) selection.trigger.focus();
      });
    };
  }, [hasMultiple, onClose, selection.media.length, selection.trigger]);

  const showPrevious = () => setActiveIndex((current) => (current - 1 + selection.media.length) % selection.media.length);
  const showNext = () => setActiveIndex((current) => (current + 1) % selection.media.length);

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
        aria-label={`${media.title}, image ${activeIndex + 1} of ${selection.media.length}`}
        tabIndex={-1}
        initial={reduced ? false : { opacity: 0, y: 12, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduced ? { opacity: 1 } : { opacity: 0, y: 8, scale: 0.99 }}
        transition={{ duration: reduced ? 0 : 0.2, ease: 'easeOut' }}
        className="relative w-full max-w-5xl rounded-2xl bg-[#101A2C] p-3 shadow-[0_30px_100px_rgba(0,0,0,0.55)] focus:outline-none sm:p-4"
      >
        <div className="mb-3 flex items-center justify-between gap-4 px-1">
          <p className="min-w-0 truncate font-mono text-xs text-[#D7DFEF]">{media.title}</p>
          <div className="flex shrink-0 items-center gap-2">
            {hasMultiple && <span className="font-mono text-[10px] text-[#91A7C1]">{activeIndex + 1} / {selection.media.length}</span>}
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
        </div>
        <div className="relative mx-auto aspect-[16/10] max-h-[78vh] w-full overflow-hidden rounded-xl bg-black/30">
          <Image key={media.src} src={media.src} alt={media.alt} fill sizes="(max-width: 1024px) 94vw, 80vw" className="object-contain" />
        </div>
        {hasMultiple && (
          <div className="mt-3 flex items-center justify-center gap-3">
            <button type="button" onClick={showPrevious} aria-label="Previous screenshot" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white hover:border-[#38BDF8]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]">
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button type="button" onClick={showNext} aria-label="Next screenshot" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white hover:border-[#38BDF8]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]">
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>,
    document.body,
  );
}
