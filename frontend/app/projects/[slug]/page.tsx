import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { projects, getProject } from '../../../libs/projects';
import SmartHireCaseStudy from '../../../components/SmartHireCaseStudy';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} — Arooj Fatima`,
    description: project.tagline,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen pt-32">
      {slug === 'smart-hire' || slug === 'smart-hire-architecture-overview' ? (
        <SmartHireCaseStudy />
      ) : (
        <section className="max-w-3xl mx-auto px-6 py-20">
          <h1 className="font-display text-4xl text-ink mb-4">{project.name}</h1>
          <p className="font-body text-muted text-lg">{project.summary}</p>
        </section>
      )}
    </main>
  );
}