'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, Quote } from 'lucide-react';

const recommendations = [
  {
    name: 'Gul Sicka Khan',
    role: 'Software Engineer at Emumba',
    relationship: 'Frontend teammate · Zero-trust cybersecurity',
    quote:
      "I had the pleasure of working with Arooj Fatima as a fellow frontend engineer on the zero-trust cybersecurity project at Emumba, where she was a senior member of our team. She has a strong grasp of frontend architecture and consistently brought clarity to complex technical decisions on the project. She was always generous with her time, whether mentoring, reviewing code, or helping the team work through tricky problems, and she pushed us toward writing cleaner, more maintainable code. Beyond the technical skills, she made our day-to-day work better, and I'd gladly work with her again.",
  },
  {
    name: 'Yumna Abbasi',
    role: 'Senior Full Stack Engineer',
    relationship: 'Frontend teammate · Extreme Networks ZTNA',
    quote:
      'I worked with Arooj as a Senior Frontend Developer on the Extreme Networks ZTNA project for 3+ years, and her work consistently set the benchmark I measured my own against. She had a rare combination of technical depth and leadership. Beyond her exceptional frontend skills, she managed projects and delegated work with real skill, staying on top of the hardest decisions while personally taking on the toughest parts of the codebase. Her work ethic and technical skills have always impressed me. Any team would be fortunate to have her.',
  },
  {
    name: 'Shah Zain',
    role: 'Development Team Lead',
    relationship: 'Project teammate',
    quote:
      'I had the opportunity to work alongside Arooj on a project, and she is exactly the kind of Senior Software Engineer you want on your team. She consistently delivered high quality code on time and always brought practical, smart suggestions to our technical discussions. Beyond her core engineering skills, she is a fantastic teammate who actively jumps in to help unblock peers so the project never stalls. Any engineering team would be incredibly lucky to have her onboard!',
  },
  {
    name: 'Muhammad Aneeq',
    role: 'Senior Software Engineer II at Emumba',
    relationship: 'Teammate · Four years',
    quote:
      "I’ve had the pleasure of working with Arooj for the past four years, and throughout this time, I’ve seen her consistently demonstrate the qualities of a strong Senior Software Engineer and an effective team lead. She has strong technical skills and a great eye for code quality, is particularly good at code reviews, and ensures engineering best practices are followed. Arooj brings ownership and responsibility to her work, adapts quickly, supports her team, and keeps standards high. I highly recommend Arooj.",
  },
  {
    name: 'Khizar Khan',
    role: 'Senior Software Engineer at TeamO',
    relationship: 'Direct manager · Four years',
    quote:
      'I worked with Arooj for four years, including a period where I led the team she was part of, and she is one of the few engineers I could hand a half-defined problem to and simply stop worrying about it. She thought through states, edge cases, performance, accessibility, and component design, and became the person the team leaned on for reviews and clear risk-raising. Arooj owns outcomes, raises the bar, and makes the people around her better. I would work with her again in a heartbeat.',
  },
  {
    name: 'Sarwan Ahmed',
    role: 'Senior Software Engineer at Emumba',
    relationship: 'Cross-team collaborator · Three and a half years',
    quote:
      'I’ve had the opportunity to work with Arooj for around three and a half years, and she is one of the most talented and skilled frontend engineers I’ve worked with. She consistently demonstrated strong technical expertise, ownership, and professionalism. She took responsibility for getting issues to the finish line, asked the right questions, aligned with the team before starting development, and delivered quality work on time. I would highly recommend her to any engineering team.',
  },
];

export default function Recommendations() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const activeRecommendation = recommendations[activeIndex];

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % recommendations.length);
    }, 9000);

    return () => window.clearInterval(intervalId);
  }, [isPaused, prefersReducedMotion]);

  function showPrevious() {
    setActiveIndex((index) => (index - 1 + recommendations.length) % recommendations.length);
  }

  function showNext() {
    setActiveIndex((index) => (index + 1) % recommendations.length);
  }

  return (
    <section id="recommendations" className="section-rule px-6 py-20 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker mb-4">Recommendations</p>
            <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">
              In my colleagues’ words.
            </h2>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            {String(activeIndex + 1).padStart(2, '0')} / {String(recommendations.length).padStart(2, '0')}
          </p>
        </div>

        <div
          className="overflow-hidden rounded-2xl border border-white/10 bg-panel/60 p-5 md:p-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setIsPaused(false);
            }
          }}
          aria-roledescription="carousel"
          aria-label="Colleague recommendations"
        >
          <div className="relative min-h-[350px] md:min-h-[300px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={activeRecommendation.name}
                initial={prefersReducedMotion ? false : { opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, x: -16 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                className="pointer-events-none absolute inset-0 flex flex-col"
                aria-live="polite"
              >
                <Quote className="mb-4 h-7 w-7 text-signal" aria-hidden="true" />
                <blockquote className="flex-1 text-base leading-relaxed text-ink md:text-lg">
                  “{activeRecommendation.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-white/10 pt-4">
                  <p className="font-display text-lg font-semibold text-ink">{activeRecommendation.name}</p>
                  <p className="mt-1 text-sm text-muted">{activeRecommendation.role}</p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
                    {activeRecommendation.relationship} · {activeRecommendation.date}
                  </p>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="relative z-10 mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
            <div className="flex items-center gap-2" aria-label="Choose recommendation">
              {recommendations.map((recommendation, index) => (
                <button
                  key={recommendation.name}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show recommendation from ${recommendation.name}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  className={`h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal ${index === activeIndex ? 'w-7 bg-signal' : 'w-2.5 bg-white/25 hover:bg-white/50'}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={showPrevious}
                aria-label="Previous recommendation"
                className="rounded-full border border-white/10 p-2 text-muted transition-colors hover:border-signal/50 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
              >
                <ChevronLeft size={17} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={showNext}
                aria-label="Next recommendation"
                className="rounded-full border border-white/10 p-2 text-muted transition-colors hover:border-signal/50 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
              >
                <ChevronRight size={17} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setIsPaused((paused) => !paused)}
                aria-label={isPaused || prefersReducedMotion ? 'Play automatic slideshow' : 'Pause automatic slideshow'}
                className="rounded-full border border-white/10 p-2 text-muted transition-colors hover:border-signal/50 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
              >
                {isPaused || prefersReducedMotion ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}