'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

type Screenshot = {
  title: string;
  src: string;
  alt: string;
};

type Role = {
  period: string;
  title: string;
  org: string;
  achievements: string[];
  skills: string[];
  screenshots?: Screenshot[];
  stats?: string[];
};

const roles: Role[] = [
  {
    period: 'Oct 2025 — Jul 2026',
    title: 'Lead Frontend Engineer, HR Automations',
    org: 'Emumba',
    achievements: [
      'Led frontend delivery for internal HR tools with React 19 and Next.js.',
      'Shipped onboarding, recognition, and interactive two-floor seating.',
      'Automated employee ID generation through BambooHR, Google Sheets, and hiring webhooks.',
      'Connected Pinpoint ATS and Slack for candidate syncs, notifications, and recognition posts.',
      'Built DynamoDB-backed seat assignments, audit logs, bulk allocation, and temporary expiry.',
    ],
    skills: ['React 19', 'Next.js', 'TypeScript', 'DynamoDB', 'BambooHR', 'Slack'],
    stats: [
      '5+ integrations: BambooHR, Slack, Pinpoint ATS',
      'Real-time seat-level assignment',
      'Automated employee ID generation',
      'Audit-logged production system',
    ],
    screenshots: [
      {
        title: 'HR Suite',
        src: '/hr-automation/suite-home.png',
        alt: 'HR Automation Suite home page with links to employee tools',
      },
      {
        title: 'Recognition',
        src: '/hr-automation/recognitions.png',
        alt: 'Employee recognition screen with QR code and recognition logs',
      },
      {
        title: 'Seating Plan',
        src: '/hr-automation/seating-plan.png',
        alt: 'Interactive office seating plan with floor controls and seat status',
      },
    ],
  },
  {
    period: 'Feb 2021 — Oct 2025',
    title: 'Senior Software Engineer (Frontend)',
    org: 'Extreme Networks (via Emumba)',
    achievements: [
      'Led 6–7 engineers in an approximately 80-person UZTNA program.',
      'Delivered responsive React interfaces across desktop, tablet, and mobile.',
      'Built micro-frontends across Public Cloud, Security Services, Access Management, and Inventory.',
      'Improved performance with lazy loading, virtualization, infinite scrolling, and bundle optimization.',
      'Maintained 90%+ Jest and React Testing Library coverage with CI-gated deployments.',
    ],
    skills: ['React 18', 'TypeScript', 'Nx', 'Single-SPA', 'Webpack 5', 'Jest'],
    screenshots: [
      {
        title: 'Network Services',
        src: '/extreme-networks/network-services.jpeg',
        alt: 'Extreme Networks network services dashboard',
      },
      {
        title: 'Applications',
        src: '/extreme-networks/applications.jpeg',
        alt: 'Extreme Networks applications dashboard',
      },
      {
        title: 'Dashboard',
        src: '/extreme-networks/dashboard.jpeg',
        alt: 'Extreme Networks security dashboard',
      },
      {
        title: 'Policy Editor',
        src: '/extreme-networks/policy.jpeg',
        alt: 'Extreme Networks network policy editor',
      },
    ],
  },
  {
    period: 'Aug 2019 — Dec 2020',
    title: 'Frontend Developer',
    org: 'Aera Technology (via Emumba)',
    achievements: [
      'Improved build and load performance by 50% through Webpack and SWC optimization.',
      'Delivered enterprise forms and data experiences with Formik and AG Grid.',
      'Built reusable frontend components with documented handoff for ongoing development.',
    ],
    skills: ['React', 'JavaScript', 'Formik', 'AG Grid'],
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

            {role.stats && (
              <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-4" aria-label={`${role.org} proof points`}>
                {role.stats.map((stat, index) => (
                  <div key={stat} className="min-h-24 rounded-xl border border-white/10 bg-black/15 p-4">
                    <span className="font-mono text-[10px] text-copper">0{index + 1}</span>
                    <p className="mt-3 text-sm font-medium leading-snug text-ink">{stat}</p>
                  </div>
                ))}
              </div>
            )}

            {role.screenshots && (
              <div className={`mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 ${role.screenshots.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>
                {role.screenshots.map((screenshot) => (
                  <figure key={screenshot.title} className="group overflow-hidden rounded-xl border border-white/10 bg-[#101a2b]">
                    <div className="relative aspect-[1.5] w-full overflow-hidden bg-white">
                      <Image
                        src={screenshot.src}
                        alt={screenshot.alt}
                        fill
                        className="object-contain transition-transform duration-500 ease-out hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <figcaption className="border-t border-white/10 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
                      {screenshot.title}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </div>
        </details>
      </motion.div>
    </article>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section-rule relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div>
          <p className="section-kicker mb-4">
            Experience
          </p>
          <div className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-4xl font-semibold tracking-[-0.03em] text-ink md:text-6xl">
              The trace, start to now.
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              Roles, results, and the products behind them.
            </p>
          </div>
          <div className="space-y-5">
            {roles.map((role) => (
              <TimelineNode key={role.title} role={role} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}