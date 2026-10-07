import { GraduationCap } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" className="section-rule px-6 py-20 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="section-kicker mb-4">Education</p>
          <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">
            The foundation underneath the work.
          </h2>
        </div>

        <article className="flex items-start gap-4 border-y border-white/10 py-6">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-copper/30 bg-copper/10 text-copper">
            <GraduationCap size={20} aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="font-display text-xl font-semibold text-ink">B.E. Electrical Engineering</h3>
                <p className="mt-1 text-sm text-muted">NUST CEME</p>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">2014 — 2018</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Gold Medal, FSC-1 · Runner-up, Best Final Year Project
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}