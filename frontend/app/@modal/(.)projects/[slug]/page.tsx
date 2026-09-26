'use client';

import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { getProject } from '../../../../libs/projects';
import { useEffect, useState } from 'react';

export default function ProjectModal({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  if (!slug) return null;
  const project = getProject(slug);
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-base/80 backdrop-blur-sm z-50 flex items-center justify-center px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => router.back()}
      >
        <motion.div
          className="bg-panel border border-copper/30 rounded-lg p-8 max-w-lg w-full"
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <p className="font-mono text-signal text-xs tracking-widest uppercase mb-3">
            {project.tagline}
          </p>
          <h2 className="font-display text-2xl text-ink mb-4">{project.name}</h2>
          <p className="font-body text-muted leading-relaxed mb-6">{project.summary}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.map((tech: string) => (
              <span key={tech} className="font-mono text-xs text-copper border border-copper/30 rounded px-2 py-1">
                {tech}
              </span>
            ))}
          </div>
          <button
            onClick={() => router.push(`/projects/${slug}`)}
            className="font-mono text-sm text-signal underline"
          >
            View full case study →
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}