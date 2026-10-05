'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

type Role = {
  period: string;
  title: string;
  org: string;
  achievements: string[];
  skills: string[];
};

const roles: Role[] = [
  {
    period: 'Oct 2025 — Jul 2026',
    title: 'Lead Frontend Engineer, HR Automations',
    org: 'Emumba',
    achievements: [
      'Owned end-to-end frontend delivery for internal HR tools using React 19, Next.js App Router, server components, and client components.',
      'Built candidate onboarding, recognition posts, and responsive two-floor seating plan experiences with interactive seat-level assignment.',
      'Implemented BambooHR and Google Sheets integrations that validate and auto-generate employee IDs from webhook-triggered hiring events.',
      'Connected Pinpoint ATS and Slack webhooks for hired-candidate syncs, notifications, branded recognition posts, and real @mentions.',
      'Used DynamoDB-backed seat assignments, audit logs, bulk allocation, recurring patterns, temporary expiry, and duplicate-notification prevention.',
      'Used GitHub Copilot, Cursor AI, Codex, and Gemini throughout the feature lifecycle to accelerate delivery and iteration.',
    ],
    skills: [
      'React 19',
      'Next.js App Router',
      'TypeScript',
      'Server Components',
      'BambooHR',
      'Google Sheets',
      'Slack Webhooks',
      'Pinpoint ATS',
      'DynamoDB',
    ],
  },
  {
    period: 'Feb 2021 — Oct 2025',
    title: 'Senior Software Engineer (Frontend)',
    org: 'Extreme Networks (via Emumba)',
    achievements: [
      'Owned the frontend codebase and led a team of 6–7 engineers within an approximately 80-person cross-functional UZTNA program.',
      'Translated Figma designs into responsive, pixel-accurate React 18 and TypeScript interfaces across desktop, tablet, and mobile.',
      'Built within a Single-SPA micro-frontend architecture using Nx and Webpack 5 across Public Cloud, Security Services, Access Management, and Inventory.',
      'Developed admin dashboards with Material UI data tables, filters, modals, cards, charts, and multi-level navigation.',
      'Improved performance through lazy loading, table virtualization, infinite scrolling, tree shaking, and Webpack bundle optimization.',
      'Maintained 90%+ Jest and React Testing Library coverage, with CI/CD builds and tests gating every deployment.',
    ],
    skills: [
      'React 18',
      'TypeScript',
      'Nx',
      'Single-SPA',
      'Webpack 5',
      'Material UI',
      'Jest',
      'React Testing Library',
      'CI/CD',
    ],
  },
  {
    period: 'Aug 2019 — Dec 2020',
    title: 'Frontend Developer',
    org: 'Aera Technology (via Emumba)',
    achievements: [
      'Improved build and load performance by 50% through Webpack and SWC optimization.',
      'Implemented Figma-to-code enterprise screens, including Formik-powered forms and AG Grid data experiences.',
      'Built and maintained reusable frontend components with clean, documented handoff for future development.',
    ],
    skills: ['React', 'JavaScript', 'Formik', 'AG Grid', 'Webpack', 'SWC', 'Responsive UI'],
  },
];

const education: Role[] = [
  {
    period: '2014 — 2018',
    title: 'B.Sc. Electrical Engineering',
    org: 'NUST CEME',
    achievements: ['Gold Medal, FSC-1. Runner-up, Best Final Year Project.'],
    skills: ['Electrical Engineering', 'Systems Thinking', 'Final Year Project'],
  },
];

function TimelineNode({ role }: { role: Role }) {
  const monogram = role.org
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="relative pb-8 last:pb-0 md:pl-28">
      <div className="absolute left-3 top-0 hidden h-full w-px bg-white/10 md:block" />
      <motion.div
        className="absolute left-3 top-0 hidden h-24 w-px origin-top bg-copper md:block"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      />

      <motion.div
        className="absolute left-[5px] top-2 hidden h-4 w-4 rounded-full border-2 md:block"
        initial={{ borderColor: '#8A96AB', backgroundColor: '#0B1220', boxShadow: 'none' }}
        whileInView={{
          borderColor: '#5EEAD4',
          backgroundColor: '#5EEAD4',
          boxShadow: '0 0 12px #5EEAD4',
        }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="group rounded-2xl border border-white/10 bg-panel/70 p-2 transition-colors duration-300 hover:border-copper/30 md:p-3"
      >
        <details open>
          <summary className="flex cursor-pointer list-none items-center gap-4 rounded-xl p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal md:p-5 [&::-webkit-details-marker]:hidden">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-copper/30 bg-copper/10 font-mono text-xs font-semibold text-copper">
              {monogram}
            </span>
            <span className="min-w-0 flex-1">
              <span className="mb-1 block font-mono text-xs uppercase tracking-[0.18em] text-copper">
                {role.org}
              </span>
              <span className="block font-display text-xl font-semibold leading-tight text-ink md:text-2xl">
                {role.title}
              </span>
            </span>
            <span className="hidden rounded-full border border-signal/25 bg-signal/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-signal sm:block">
              {role.period}
            </span>
            <ChevronDown className="details-chevron h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
          </summary>

          <div className="border-t border-white/10 px-4 pb-4 pt-5 md:px-5 md:pb-5">
            <span className="mb-5 inline-block rounded-full border border-signal/25 bg-signal/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-signal sm:hidden">
              {role.period}
            </span>

            <ul className="space-y-3">
              {role.achievements.map((achievement, i) => (
                <li key={i} className="flex gap-3 font-body text-sm leading-relaxed text-muted md:text-base">
                  <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-copper">
                Skills & technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {role.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-copper/25 bg-copper/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-copper"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </details>
      </motion.div>
    </article>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section-rule relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-4xl">
        <p className="section-kicker mb-4">
          Experience
        </p>
        <div className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-4xl font-semibold tracking-[-0.03em] text-ink md:text-6xl">
            The trace, start to now.
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            A progression from product delivery to frontend architecture and technical leadership.
          </p>
        </div>
        <div className="space-y-5">
          {roles.map((role) => (
            <TimelineNode key={role.title} role={role} />
          ))}
        </div>

        <div id="education" className="mt-24 border-t border-panel pt-16">
          <p className="section-kicker mb-4">
            Education
          </p>
          <h2 className="mb-12 font-display text-3xl font-semibold text-ink md:text-4xl">
            The foundation underneath the work.
          </h2>
          <div>
            {education.map((entry) => (
              <TimelineNode key={entry.title} role={entry} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}