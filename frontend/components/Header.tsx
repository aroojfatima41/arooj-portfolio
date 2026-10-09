'use client';

import Link from 'next/link';
import { FileDown } from 'lucide-react';
import { FaLinkedin , FaGithub} from 'react-icons/fa';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Recommendations', href: '#recommendations' },
  { label: 'Projects', href: '#projects' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#080F1F]/95 px-4 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl md:px-6">
      <nav aria-label="Main navigation" className="mx-auto flex max-w-6xl items-center justify-between gap-3 py-3 md:py-3.5">
        <Link
          href="#top"
          className="group flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#60A5FA]/30 bg-gradient-to-br from-[#38BDF8]/20 to-[#7C3AED]/20 font-mono text-xs font-semibold text-[#93C5FD] shadow-[inset_0_1px_rgba(255,255,255,0.08)] transition-colors group-hover:border-[#60A5FA]/55 group-hover:from-[#38BDF8]/30 group-hover:to-[#7C3AED]/30">
            AF
          </span>
          <span className="hidden whitespace-nowrap font-display text-sm font-semibold tracking-tight text-ink sm:block">
            Arooj Fatima
          </span>
        </Link>

        <div className="hidden items-center gap-1 sm:gap-2 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-2.5 py-2 font-sans text-xs font-medium normal-case tracking-normal text-[#C7D2E4] transition-colors hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA] sm:px-3 sm:text-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Link
            href="#contact"
            className="rounded-lg border border-[#60A5FA]/25 bg-[#3B82F6]/10 px-3 py-2 font-sans text-xs font-semibold text-[#93C5FD] transition-colors hover:border-[#60A5FA]/50 hover:bg-[#3B82F6]/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA] sm:px-4 sm:text-sm"
          >
            Contact
          </Link>
          <a
            href="/arooj-fatima-resume.pdf"
            download="Arooj-Fatima-Resume.pdf"
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 font-sans text-xs font-medium text-[#C7D2E4] transition-colors hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA] sm:px-3 sm:text-sm"
          >
            <FileDown size={14} aria-hidden="true" />
            Resume
          </a>
          <a
            href="https://www.linkedin.com/in/arooj-fatima-945623a3/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile (opens in a new tab)"
            title="LinkedIn"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.09] bg-white/[0.02] text-muted transition-colors hover:border-signal/40 hover:bg-white/[0.06] hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
          >
            <FaLinkedin size={16} aria-hidden="true" />
          </a>
          <a
            href="https://github.com/aroojfatima41/frontend"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile (opens in a new tab)"
            title="GitHub"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.09] bg-white/[0.02] text-muted transition-colors hover:border-signal/40 hover:bg-white/[0.06] hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
          >
            <FaGithub size={16} aria-hidden="true" />
          </a>
        </div>
      </nav>
    </header>
  );
}
