export type SmartHireStatus = 'implemented' | 'in-progress';

export type SmartHireProjectData = {
  eyebrow: string;
  title: string;
  summary: string;
  chips: string[];
  tagline: string;
  projectSummary: string;
  stack: string[];
};

export const smartHireProject: SmartHireProjectData = {
  eyebrow: 'Backend case study',
  title: 'Smart Hire',
  summary: 'AI-scored, event-driven hiring platform: six services, durable workflows, and every state change published as an event.',
  chips: ['Backend', 'Event-driven', 'AI matching'],
  tagline: 'AI-scored, event-driven recruitment platform',
  projectSummary: 'A recruitment platform built from six cooperating microservices, Temporal workflows, Kafka events, and cosine similarity matching.',
  stack: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Alembic', 'pgvector', 'Kafka', 'Temporal', 'Groq', 'Sentence Transformers', 'MinIO', 'Docker Compose', 'JWT', 'RBAC'],
};

export const smartHireCopy = {
  statsLabel: 'Smart Hire at a glance',
  flowEyebrow: 'Application lifecycle',
  flowTitle: 'One application, end to end',
  flowReplay: 'Replay flow',
  flowSelectPrompt: 'Select a step to see what happens.',
  servicesEyebrow: 'Clear service ownership',
  servicesTitle: 'Six services, six owners',
  servicesHint: 'Select a service to highlight the steps it owns or coordinates.',
  statusEyebrow: 'Delivery status',
  statusTitle: 'What is implemented',
  decisionsEyebrow: 'Reliability by design',
  decisionsTitle: 'Hard problems, specific decisions',
  problemLabel: 'Problem',
  decisionLabel: 'Decision',
  implementedLabel: 'Implemented',
  inProgressLabel: 'In progress',
  technologyTitle: 'Technology',
  contactPrompt: 'Want to talk through the system or its design decisions?',
  contactLink: 'Contact me',
} as const;

export const smartHireStats = [
  { value: 6, suffix: '', label: 'Microservices', final: '6' },
  { value: 3, suffix: '', label: 'Durable workflows', final: '3' },
  { value: 384, suffix: '-d', label: 'Embeddings', final: '384-d' },
  { value: 100, suffix: '', label: 'Match score', final: '0 to 100' },
] as const;

export type SmartHirePipelineStep = {
  label: string;
  service: string;
  detail: string;
  serviceIds: string[];
};

export const smartHirePipeline: SmartHirePipelineStep[] = [
  {
    label: 'Apply',
    service: 'Job Service',
    detail: 'Creates the application and starts its processing workflow.',
    serviceIds: ['job', 'workflow'],
  },
  {
    label: 'Workflow starts',
    service: 'Workflow Service',
    detail: 'A deterministic workflow ID prevents duplicate workflow starts.',
    serviceIds: ['workflow'],
  },
  {
    label: 'AI scores match',
    service: 'AI Service',
    detail: 'Resume and job embeddings are compared with cosine similarity.',
    serviceIds: ['ai', 'user'],
  },
  {
    label: 'Threshold screen',
    service: 'Job Service',
    detail: 'Scores below the configurable threshold, currently 50, are rejected automatically.',
    serviceIds: ['job'],
  },
  {
    label: 'Recruiter decision',
    service: 'Workflow Service',
    detail: 'The workflow waits for recruiter action, candidate withdrawal, or a stage timeout.',
    serviceIds: ['workflow', 'job'],
  },
  {
    label: 'Event published',
    service: 'Job Service',
    detail: 'An outbox worker publishes the committed state change to Kafka.',
    serviceIds: ['job'],
  },
  {
    label: 'Email and dashboard',
    service: 'Analytics + Notification',
    detail: 'Analytics records the event and Notification emails the candidate.',
    serviceIds: ['analytics', 'notification'],
  },
];

export type SmartHireService = {
  id: string;
  name: string;
  responsibility: string;
  badge: string;
};

export const smartHireServices: SmartHireService[] = [
  { id: 'user', name: 'User Service', responsibility: 'Accounts, JWT login, role access, candidate profiles, and resume uploads to MinIO.', badge: 'Own database' },
  { id: 'job', name: 'Job Service', responsibility: 'Jobs, applications, stages, score storage, status tracking, and transactional outbox.', badge: 'Own database' },
  { id: 'workflow', name: 'Workflow Service', responsibility: 'Coordinates long-running job, profile, and application processes with Temporal.', badge: 'Orchestrator' },
  { id: 'ai', name: 'AI Service', responsibility: 'Extracts resume and job details, creates embeddings, scores matches, and serves the assistant.', badge: 'Own database' },
  { id: 'analytics', name: 'Analytics Service', responsibility: 'Consumes Kafka events for hiring funnel metrics and recruiter dashboard APIs.', badge: 'Own database' },
  { id: 'notification', name: 'Notification Service', responsibility: 'Consumes Kafka events and sends candidate emails over SMTP.', badge: 'Event consumer' },
];

export type SmartHireStatusGroup = {
  heading: string;
  items: { label: string; status: SmartHireStatus }[];
};

export const smartHireStatusGroups: SmartHireStatusGroup[] = [
  {
    heading: 'Services and data',
    items: [
      { label: 'Transactional services each own their database', status: 'implemented' },
      { label: 'Resume uploads to MinIO and structured records in PostgreSQL', status: 'implemented' },
      { label: 'JWT login and candidate or recruiter role checks', status: 'implemented' },
    ],
  },
  {
    heading: 'Events and reliability',
    items: [
      { label: 'HTTP for immediate calls and Kafka for service events', status: 'implemented' },
      { label: 'Transactional outbox for state changes and Kafka events', status: 'implemented' },
      { label: 'Deterministic workflow IDs and event ID idempotency', status: 'implemented' },
      { label: 'Kafka acknowledgements, retry handling, and explicit failure states', status: 'implemented' },
    ],
  },
  {
    heading: 'Orchestration',
    items: [
      { label: 'Three Temporal workflows for jobs, profiles, and applications', status: 'implemented' },
      { label: 'Signals and timers for recruiter decisions and stage timeouts', status: 'implemented' },
    ],
  },
  {
    heading: 'AI pipeline',
    items: [
      { label: 'Groq extraction of resume skills, experience, and education', status: 'implemented' },
      { label: '384-d Sentence Transformers embeddings with cosine match scores', status: 'implemented' },
      { label: 'AI assistant intent detection, permission checks, direct lookups, and Groq responses', status: 'implemented' },
      { label: 'RAG retrieval for the AI assistant', status: 'in-progress' },
    ],
  },
  {
    heading: 'Observability',
    items: [
      { label: 'OpenTelemetry, Jaeger, Prometheus, and structured logging', status: 'implemented' },
    ],
  },
];

export const smartHireDecisions = [
  { problem: 'A service crashes after writing to its database', decision: 'Transactional outbox commits the state change and event record together.' },
  { problem: 'Requests repeat and events are redelivered', decision: 'Deterministic workflow IDs and event ID idempotency prevent duplicate processing.' },
  { problem: 'Recruiter decisions can take days', decision: 'Temporal signals and timers wait for decisions without keeping requests open.' },
  { problem: 'A downstream service fails', decision: 'Activities retry, failure states are stored, and consumers commit only after success.' },
] as const;

export const smartHireTechGroups = [
  { heading: 'Backend', items: ['Python', 'FastAPI', 'SQLAlchemy', 'Alembic', 'JWT', 'RBAC', 'Docker Compose'] },
  { heading: 'Data', items: ['PostgreSQL', 'pgvector', 'MinIO'] },
  { heading: 'Messaging', items: ['Kafka'] },
  { heading: 'Orchestration', items: ['Temporal Python SDK'] },
  { heading: 'AI', items: ['Groq', 'Sentence Transformers'] },
  { heading: 'Observability', items: ['OpenTelemetry', 'Jaeger', 'Prometheus', 'Structured logging'] },
] as const;
