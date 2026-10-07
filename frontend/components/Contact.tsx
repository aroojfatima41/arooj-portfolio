'use client';

import { useState, type FormEvent } from 'react';
import { Send } from 'lucide-react';

type SubmissionState = 'idle' | 'sending' | 'sent' | 'error';

export default function Contact() {
  const [state, setState] = useState<SubmissionState>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('sending');
    setStatusMessage('');

    const form = event.currentTarget;
    const values = new FormData(form);
    const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/$/, '');

    try {
      const response = await fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.get('name'),
          email: values.get('email'),
          subject: values.get('subject'),
          message: values.get('message'),
          website: values.get('website'),
        }),
      });

      if (response.status === 503) {
        setState('error');
        setStatusMessage('Email service settings need attention. Please try again later.');
        return;
      }

      if (!response.ok) {
        setState('error');
        setStatusMessage('Your message could not be sent. Please try again later.');
        return;
      }

      form.reset();
      setState('sent');
      setStatusMessage('Message sent. Thanks for reaching out.');
    } catch {
      setState('error');
      setStatusMessage('The contact service is unavailable. Please try again later.');
    }
  }

  return (
    <section id="contact" className="section-rule px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="section-kicker mb-4">Contact</p>
          <h2 className="font-display text-4xl font-semibold leading-tight text-ink md:text-5xl">
            Let’s talk about what you’re building.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
            Send a note about a role, a project, or a technical challenge. I’ll get back to you by email.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5" aria-label="Contact form">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              Name
              <input
                name="name"
                type="text"
                autoComplete="name"
                minLength={2}
                maxLength={100}
                required
                className="min-h-12 rounded-lg border border-white/15 bg-panel/55 px-4 font-body text-base normal-case tracking-normal text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-signal"
                placeholder="Your name"
              />
            </label>
            <label className="grid gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              Email
              <input
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                required
                className="min-h-12 rounded-lg border border-white/15 bg-panel/55 px-4 font-body text-base normal-case tracking-normal text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-signal"
                placeholder="you@example.com"
              />
            </label>
          </div>

          <label className="grid gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            Subject
            <input
              name="subject"
              type="text"
              minLength={3}
              maxLength={120}
              required
              className="min-h-12 rounded-lg border border-white/15 bg-panel/55 px-4 font-body text-base normal-case tracking-normal text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-signal"
              placeholder="What would you like to discuss?"
            />
          </label>

          <label className="grid gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            Message
            <textarea
              name="message"
              rows={5}
              minLength={10}
              maxLength={5000}
              required
              className="resize-y rounded-lg border border-white/15 bg-panel/55 px-4 py-3 font-body text-base normal-case tracking-normal text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-signal"
              placeholder="Tell me a little about it..."
            />
          </label>

          <label aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
            Website
            <input name="website" type="text" tabIndex={-1} autoComplete="off" />
          </label>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={state === 'sending'}
              className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-[#5EEAD4] px-5 font-mono text-xs uppercase tracking-[0.12em] text-[#0B1220] transition-colors hover:bg-[#8AF2E1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal disabled:cursor-wait disabled:opacity-60"
            >
              {state === 'sending' ? 'Sending' : 'Send message'}
              <Send size={15} aria-hidden="true" />
            </button>
            <p aria-live="polite" role={state === 'error' ? 'alert' : 'status'} className="text-sm text-muted">
              {statusMessage}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}