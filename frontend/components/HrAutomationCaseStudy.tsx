import Image from 'next/image';

const screenshots = [
  {
    title: 'HR Automation Suite',
    src: '/hr-automation/suite-home.png',
    alt: 'HR Automation Suite home page with links to employee and HR tools',
  },
  {
    title: 'Employee Recognition',
    src: '/hr-automation/recognitions.png',
    alt: 'Employee recognition screen with QR code and recognition logs',
  },
  {
    title: 'Interactive Seating Plan',
    src: '/hr-automation/seating-plan.png',
    alt: 'Office seating plan with floor controls, seat statuses, and system statistics',
  },
];

export default function HrAutomationCaseStudy() {
  return (
    <section className="section-rule px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 max-w-3xl">
          <p className="section-kicker mb-4">Flagship case study · Emumba</p>
          <h1 className="font-display text-4xl font-semibold leading-tight text-ink md:text-6xl">
            HR Automation Suite
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted md:text-xl">
            A connected set of tools that streamlines employee operations, from onboarding and
            recognition to interactive office seating and team workflows.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {['React 19', 'Next.js', 'TypeScript', 'DynamoDB', 'BambooHR', 'Google Sheets', 'Slack'].map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-copper/25 bg-copper/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-copper"
              >
                {skill}
              </span>
            ))}
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {screenshots.map((screenshot) => (
            <figure
              key={screenshot.title}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
            >
              <div className="relative aspect-[1.45] w-full bg-white">
                <Image
                  src={screenshot.src}
                  alt={screenshot.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <figcaption className="border-t border-slate-200 bg-white px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-600">
                {screenshot.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}