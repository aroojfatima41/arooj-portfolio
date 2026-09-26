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
    slug: 'this-portfolio',
    name: 'This Portfolio',
    tagline: 'AI-assisted personal site',
    summary:
      'A Next.js App Router site with an AI chatbox grounded in my own resume data, plus a resume-job matching tool.',
    stack: ['Next.js', 'FastAPI', 'Sentence Transformers', 'FAISS'],
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