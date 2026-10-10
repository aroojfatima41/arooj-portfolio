import { smartHireProject } from './smartHire';

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
    tagline: smartHireProject.tagline,
    summary: smartHireProject.projectSummary,
    stack: smartHireProject.stack,
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
    tagline: smartHireProject.tagline,
    summary: smartHireProject.projectSummary,
    stack: smartHireProject.stack,
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
