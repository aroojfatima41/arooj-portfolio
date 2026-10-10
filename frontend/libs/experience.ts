export type ExperienceMetric = {
  value: string;
  label: string;
  detail?: string;
  countTo?: number;
  prefix?: string;
  suffix?: string;
};

export type ExperienceMedia = {
  title: string;
  src: string;
  alt: string;
};

export type ExperienceChapterData = {
  id: string;
  level: string;
  company: string;
  role: string;
  railYears: string;
  year: string;
  metrics: ExperienceMetric[];
  bullets: [string, string, string];
  details: string[];
  tech: string[];
  screenshots?: ExperienceMedia[];
  website?: {
    sentence: string;
    label: string;
    url: string;
    screenshots: ExperienceMedia[];
  };
};

export const EXPERIENCE_CHAPTERS: ExperienceChapterData[] = [
  {
    id: 'experience-emumba',
    level: 'Lead',
    company: 'Emumba',
    role: 'Lead Frontend Engineer, HR Automations',
    railYears: '2025 to 2026',
    year: '2026',
    metrics: [
      {
        value: '4',
        countTo: 4,
        label: 'Named integrations',
        detail: 'BambooHR · Google Sheets · Pinpoint ATS · Slack',
      },
      { value: '2', countTo: 2, label: 'Floors in the interactive seating plan' },
    ],
    bullets: [
      'Shipped candidate onboarding, recognition posts, and a two-floor interactive seating plan.',
      'Automated employee ID generation from BambooHR, Google Sheets, and hiring webhooks.',
      'Built DynamoDB-backed seat assignment with audit logs, bulk allocation, and temporary expiry.',
    ],
    details: [
      'Connected Pinpoint ATS and Slack for candidate syncs, notifications, and recognition posts.',
    ],
    tech: ['React 19', 'Next.js', 'TypeScript', 'DynamoDB', 'BambooHR', 'Slack'],
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
    website: {
      sentence: 'Also contributed to the public Emumba website: responsive layout fixes, slider and nav menu fixes, and content updates.',
      label: 'emumba.com',
      url: 'https://emumba.com',
      screenshots: [
        {
          title: 'Company culture',
          src: '/emumba/company-culture.png',
          alt: 'Emumba website company culture and Ethos section',
        },
        {
          title: 'Cloud migration',
          src: '/emumba/cloud-migration.png',
          alt: 'Emumba website AWS cloud migration service page',
        },
        {
          title: 'Agentic systems',
          src: '/emumba/agentic-systems.png',
          alt: 'Emumba website homepage featuring agentic systems and services',
        },
      ],
    },
  },
  {
    id: 'experience-extreme-networks',
    level: 'Senior',
    company: 'Extreme Networks (via Emumba)',
    role: 'Senior Software Engineer (Frontend)',
    railYears: '2021 to 2025',
    year: '2021',
    metrics: [
      { value: '6-7', label: 'Engineers led' },
      { value: 'about 80', prefix: 'about ', countTo: 80, label: 'People in the program' },
      { value: '90%+', countTo: 90, suffix: '%+', label: 'Test coverage' },
    ],
    bullets: [
      'Built micro-frontends across Public Cloud, Security Services, Access Management, and Inventory.',
      'Improved performance with lazy loading, virtualization, infinite scrolling, and bundle optimization.',
      'Kept Jest and React Testing Library coverage above 90% with CI-gated deployments.',
    ],
    details: [
      'Delivered responsive React interfaces across desktop, tablet, and mobile.',
    ],
    tech: ['React 18', 'TypeScript', 'Nx', 'Single-SPA', 'Webpack 5', 'Jest'],
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
    id: 'experience-aera-technology',
    level: 'Developer',
    company: 'Aera Technology (via Emumba)',
    role: 'Frontend Developer',
    railYears: '2019 to 2020',
    year: '2019',
    metrics: [
      { value: '50%', countTo: 50, suffix: '%', label: 'Faster build and load' },
    ],
    bullets: [
      'Improved build and load performance by 50% through Webpack and SWC optimization.',
      'Delivered enterprise forms and data experiences with Formik and AG Grid.',
      'Built reusable frontend components with documented handoff for ongoing development.',
    ],
    details: [],
    tech: ['React', 'Webpack', 'SWC', 'Formik', 'AG Grid', 'SWR'],
  },
];
