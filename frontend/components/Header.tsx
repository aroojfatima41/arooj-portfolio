'use client';

import Link from 'next/link';
import { CodeXml } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 md:px-6">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-white/10 bg-[#0a111d]/80 px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl md:px-5">
        <Link
          href="#top"
          className="group flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-copper/40 bg-copper/10 font-mono text-xs font-semibold text-copper transition-colors group-hover:bg-copper/20">
            AF
          </span>
          <span className="hidden whitespace-nowrap font-display text-sm font-semibold tracking-tight text-ink sm:block">
            Arooj Fatima
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-2 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted transition-colors hover:bg-white/5 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal sm:px-3 sm:text-[11px] ${link.label === 'Experience' ? 'hidden sm:inline-flex' : ''} ${link.label === 'Education' ? 'hidden lg:inline-flex' : ''} ${link.label === 'Contact' ? 'hidden md:inline-flex' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <a
            href="https://www.linkedin.com/in/arooj-fatima-945623a3/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile (opens in a new tab)"
            title="LinkedIn"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-2 py-2 text-muted transition-colors hover:border-signal/40 hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal sm:px-3"
          >
            <FaLinkedin size={16} aria-hidden="true" />
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.12em] lg:inline">LinkedIn</span>
          </a>
          <a
            href="https://github.com/aroojfatima41/frontend"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile (opens in a new tab)"
            title="GitHub"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-2 py-2 text-muted transition-colors hover:border-signal/40 hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal sm:px-3"
          >
            <CodeXml size={16} aria-hidden="true" />
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.12em] lg:inline">GitHub</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
