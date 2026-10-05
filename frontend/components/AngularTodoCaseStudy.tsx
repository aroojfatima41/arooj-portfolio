const features = [
  'Create tasks',
  'Toggle completion',
  'Filter tasks',
  'Delete tasks',
  'Clear completed tasks',
  'Real-time validation',
  'Async loading indicators',
];

const technologies = [
  'Angular 20',
  'TypeScript',
  'RxJS',
  'Angular Reactive Forms',
  'Angular Signals',
  'Standalone Components',
];

export default function AngularTodoCaseStudy() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <header className="max-w-3xl">
        <p className="section-kicker mb-5">Modern frontend practice project</p>
        <h1 className="font-display text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-ink md:text-7xl">
          Angular Todo App
        </h1>
        <p className="mt-7 text-lg leading-relaxed text-muted md:text-xl">
          A feature-rich todo application built with Angular 20 and TypeScript to practice modern frontend patterns. It supports task creation, completion, filtering, deletion, and clearing completed tasks, with real-time validation and loading indicators for asynchronous actions.
        </p>
      </header>

      <div className="mt-14 grid gap-8 border-y border-white/10 py-10 md:grid-cols-[0.75fr_1.25fr] md:gap-16">
        <div>
          <p className="section-kicker mb-4">Technologies</p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-copper/25 bg-copper/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-copper"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="section-kicker mb-4">Application features</p>
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {features.map((feature, index) => (
              <li key={feature} className="flex items-center gap-3 text-sm text-ink/90">
                <span className="font-mono text-xs text-signal">0{index + 1}</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 max-w-3xl">
        <p className="section-kicker mb-4">Focus</p>
        <p className="text-base leading-relaxed text-muted md:text-lg">
          The project highlights maintainable Angular application structure, reactive state management, form validation, and clear feedback during asynchronous actions.
        </p>
      </div>
    </section>
  );
}
