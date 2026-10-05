'use client';

import Link from 'next/link';
import { ArrowDownRight } from 'lucide-react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Education', href: '#education' },
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
          <span className="hidden font-display text-sm font-semibold tracking-tight text-ink sm:block">
            Arooj Fatima
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-2 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted transition-colors hover:bg-white/5 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal sm:px-3 sm:text-[11px]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="#work"
          className="hidden items-center gap-2 rounded-lg border border-signal/30 bg-signal/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-signal transition-colors hover:bg-signal/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal sm:flex"
        >
          Explore work
          <ArrowDownRight size={14} aria-hidden="true" />
        </Link>
      </nav>
    </header>
  );
}
