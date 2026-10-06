export type Project = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    slug: 'smart-hire',
    name: 'Smart Hire',
    tagline: 'AI hiring platform for faster recruitment',
    summary:
      'An AI-powered recruitment platform that connects job discovery, candidate matching, and hiring workflows through event-driven microservices, vector search, and workflow orchestration.',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'Kafka', 'Temporal', 'Docker', 'Groq LLM'],
  },
  {
    slug: 'angular-todo-app',
    name: 'Angular Todo App',
    tagline: 'Modern frontend practice project',
    summary:
      'A feature-rich todo application built with Angular 20 and TypeScript to practice modern frontend patterns. It supports task creation, completion, filtering, deletion, and clearing completed tasks, with real-time validation and loading indicators for asynchronous actions.',
    stack: [
      'Angular 20',
      'TypeScript',
      'RxJS',
      'Angular Reactive Forms',
      'Angular Signals',
      'Standalone Components',
    ],
  },
  {
    slug: 'smart-hire-architecture-overview',
    name: 'Smart Hire',
    tagline: 'AI hiring platform for smarter recruitment',
    summary:
      'A distributed hiring platform that automates candidate discovery, job matching, and recruitment workflows using AI, semantic search, and event-driven microservices to reduce manual screening effort and improve hiring efficiency.',
    stack: ['System Design', 'Microservices', 'Kafka', 'Temporal', 'PostgreSQL', 'pgvector', 'LLM', 'Architecture'],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}