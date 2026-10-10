'use client';

import { useCallback, useEffect, useRef, useState, type FocusEvent as ReactFocusEvent, type MouseEvent, type PointerEvent } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
} from 'framer-motion';
import { FileDown } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const sectionLinks = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Recommendations', href: '#recommendations', id: 'recommendations' },
];

const menuVariants: Variants = {
  closed: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.16, when: 'afterChildren' },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: 'easeOut', staggerChildren: 0.04 },
  },
};

const menuLinkVariants: Variants = {
  closed: { opacity: 0, y: -6 },
  open: { opacity: 1, y: 0, transition: { duration: 0.16, ease: 'easeOut' } },
};

const reducedMenuVariants: Variants = {
  closed: { opacity: 0, y: 0, transition: { duration: 0 } },
  open: { opacity: 1, y: 0, transition: { duration: 0 } },
};

const reducedMenuLinkVariants: Variants = {
  closed: { opacity: 0, y: 0 },
  open: { opacity: 1, y: 0, transition: { duration: 0 } },
};

function SocialLinks() {
  return (
    <div className="flex items-center gap-1">
      <a
        href="https://www.linkedin.com/in/arooj-fatima-945623a3/"
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn profile, opens in a new tab"
        title="LinkedIn"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#C7D2E4] hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]"
      >
        <FaLinkedin size={17} aria-hidden="true" />
      </a>
      <a
        href="https://github.com/aroojfatima41/frontend"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub profile, opens in a new tab"
        title="GitHub"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#C7D2E4] hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]"
      >
        <FaGithub size={17} aria-hidden="true" />
      </a>
    </div>
  );
}

export default function Header() {
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = prefersReducedMotion === true;
  const [activeSection, setActiveSection] = useState('about');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const menuOpenRef = useRef(false);
  const focusWithinRef = useRef(false);
  const lastScrollY = useRef(0);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const headerY = useSpring(isHidden ? -64 : 0, { stiffness: 320, damping: 34, mass: 0.7 });

  useEffect(() => {
    menuOpenRef.current = menuOpen;
    focusWithinRef.current = focusWithin;
  }, [focusWithin, menuOpen]);

  useEffect(() => {
    const targets = sectionLinks
      .map((link) => document.getElementById(link.id))
      .filter((target): target is HTMLElement => target !== null);

    const updateActiveSection = () => {
      let current = sectionLinks[0].id;
      for (const target of targets) {
        if (target.getBoundingClientRect().top <= 120) current = target.id;
      }
      setActiveSection((currentActive) => currentActive === current ? currentActive : current);
    };

    let frame = 0;
    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateActiveSection();
      });
    };

    const observer = new IntersectionObserver(scheduleUpdate, {
      rootMargin: '-64px 0px -55% 0px',
      threshold: 0,
    });
    targets.forEach((target) => observer.observe(target));
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    updateActiveSection();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = lastScrollY.current;
    const scrolled = latest > 24;
    setIsScrolled((value) => value === scrolled ? value : scrolled);

    const hero = document.getElementById('about');
    const heroBottom = hero ? hero.getBoundingClientRect().bottom + latest : Number.POSITIVE_INFINITY;
    const pastHero = latest > heroBottom;

    if (!pastHero || menuOpenRef.current || focusWithinRef.current) {
      setIsHidden(false);
    } else if (latest > previous + 1) {
      setIsHidden(true);
    } else if (latest < previous - 1) {
      setIsHidden(false);
    }

    lastScrollY.current = latest;
  });

  const handleAnchorClick = useCallback((event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;

    event.preventDefault();
    window.history.pushState(null, '', href);
    if (href === '#top') setActiveSection('about');
    else setActiveSection(href.slice(1));

    const scrollToTarget = () => target.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });

    if (menuOpenRef.current) {
      setMenuOpen(false);
      window.requestAnimationFrame(scrollToTarget);
    } else {
      scrollToTarget();
    }
  }, [reducedMotion]);

  const handleFocus = () => {
    setFocusWithin(true);
    setIsHidden(false);
  };

  const handleBlur = (event: ReactFocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setFocusWithin(false);
    }
  };

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const panel = mobileMenuRef.current;
    const menuButton = menuButtonRef.current;
    const getFocusable = () => panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const focusFrame = window.requestAnimationFrame(() => getFocusable()?.[0]?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = getFocusable();
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const keepFocusInside = (event: Event) => {
      if (panel && !panel.contains(event.target as Node)) getFocusable()?.[0]?.focus();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focusin', keepFocusInside);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', keepFocusInside);
      document.body.style.overflow = previousOverflow;
      window.requestAnimationFrame(() => menuButton?.focus());
    };
  }, [menuOpen]);

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener('resize', closeOnDesktop);
    return () => window.removeEventListener('resize', closeOnDesktop);
  }, []);

  const handleOutsidePointer = (event: PointerEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) setMenuOpen(false);
  };

  const renderSectionLink = (link: (typeof sectionLinks)[number], mobile = false) => {
    const isActive = activeSection === link.id;
    return (
      <motion.a
        key={link.id}
        href={link.href}
        onClick={(event) => handleAnchorClick(event, link.href)}
        variants={mobile ? (reducedMotion ? reducedMenuLinkVariants : menuLinkVariants) : undefined}
        aria-current={isActive ? 'location' : undefined}
        className={mobile
          ? `relative flex min-h-12 items-center rounded-xl px-4 text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC] ${isActive ? 'bg-white/[0.07] text-white' : 'text-[#D7DFEF] hover:bg-white/[0.05] hover:text-white'}`
          : `relative rounded-lg px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC] ${isActive ? 'text-white' : 'text-[#C7D2E4] hover:text-white'}`}
      >
        {link.label}
        {!mobile && isActive && (reducedMotion ? (
          <span aria-hidden="true" className="absolute inset-x-3 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6]" />
        ) : (
          <motion.span
            aria-hidden="true"
            layoutId="active-section-indicator"
            className="absolute inset-x-3 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6]"
            transition={{ type: 'spring', stiffness: 420, damping: 34 }}
          />
        ))}
      </motion.a>
    );
  };

  return (
    <>
      <motion.header
        onFocusCapture={handleFocus}
        onBlurCapture={handleBlur}
        style={{ y: reducedMotion ? (isHidden ? -64 : 0) : headerY }}
        className="sticky top-0 z-50 -mb-[64px] h-[64px] bg-transparent"
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[64px] origin-top border-b border-white/10 bg-[#080F1F]/85 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl"
          animate={{ opacity: isScrolled ? 1 : 0, scaleY: isScrolled ? 0.9 : 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.24, ease: 'easeOut' }}
        />

        <a
          href="#about"
          onClick={(event) => handleAnchorClick(event, '#about')}
          className="sr-only absolute left-4 top-2 z-[70] rounded-lg bg-[#0B1427] px-4 py-3 font-sans text-sm font-semibold text-white focus:not-sr-only focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]"
        >
          Skip to content
        </a>

        <nav aria-label="Primary" className="relative mx-auto flex h-[64px] max-w-5xl items-center justify-between gap-2 px-4 sm:gap-3 md:px-6">
          <a
            href="#top"
            onClick={(event) => handleAnchorClick(event, '#top')}
            className="group flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC] sm:gap-3"
          >
            <span className="relative flex h-8 w-8 items-center justify-center rounded-xl border border-[#60A5FA]/35 bg-gradient-to-br from-[#38BDF8]/15 to-[#7C3AED]/15 font-mono text-[11px] font-semibold text-[#D7E8FF] group-hover:border-[#60A5FA]/70 sm:h-9 sm:w-9">
              <span aria-hidden="true" className="absolute -inset-1 -z-10 rounded-xl bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] opacity-0 blur-md transition-opacity group-hover:opacity-45" />
              AF
            </span>
            <span className="whitespace-nowrap font-display text-xs font-semibold tracking-tight text-ink sm:text-[13px]">Arooj Fatima</span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {sectionLinks.map((link) => renderSectionLink(link))}
          </div>

          <div className="hidden shrink-0 items-center gap-1 lg:flex">
            <a
              href="/arooj-fatima-resume.pdf"
              download="Arooj-Fatima-Resume.pdf"
              className="inline-flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#D7DFEF] transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]"
            >
              <FileDown size={15} aria-hidden="true" />
              Resume
            </a>
            <SocialLinks />
            <a
              href="#contact"
              onClick={(event) => handleAnchorClick(event, '#contact')}
              className="ml-1 inline-flex min-h-10 items-center justify-center rounded-lg bg-gradient-to-r from-[#0EA5E9] to-[#7C3AED] px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_18px_rgba(59,130,246,0.16)] hover:shadow-[0_6px_24px_rgba(124,58,237,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1427]"
            >
              Contact
            </a>
          </div>

          <div className="flex shrink-0 items-center gap-2 lg:hidden">
            <a
              href="#contact"
              onClick={(event) => handleAnchorClick(event, '#contact')}
              className="inline-flex min-h-10 items-center justify-center rounded-lg bg-gradient-to-r from-[#0EA5E9] to-[#7C3AED] px-3 py-2 text-xs font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1427]"
            >
              Contact
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-primary-menu"
              onClick={() => {
                setIsHidden(false);
                setMenuOpen((open) => !open);
              }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/[0.03] text-white hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]"
            >
              <span className="relative flex h-4 w-5 flex-col justify-between" aria-hidden="true">
                <motion.span
                  className="h-0.5 w-5 rounded-full bg-current"
                  animate={menuOpen ? { y: 7, rotate: 45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.18 }}
                />
                <motion.span
                  className="h-0.5 w-5 rounded-full bg-current"
                  animate={{ opacity: menuOpen ? 0 : 1 }}
                  transition={{ duration: reducedMotion ? 0 : 0.12 }}
                />
                <motion.span
                  className="h-0.5 w-5 rounded-full bg-current"
                  animate={menuOpen ? { y: -7, rotate: -45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.18 }}
                />
              </span>
            </button>
          </div>
        </nav>

      </motion.header>

      <motion.div
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        initial={false}
        animate={{ opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.18 }}
        style={{ pointerEvents: menuOpen ? 'auto' : 'none' }}
        onPointerDown={handleOutsidePointer}
        className="fixed inset-x-0 bottom-0 top-[64px] z-40 bg-[#060B16]/55 backdrop-blur-sm lg:hidden"
      >
        <motion.nav
          ref={mobileMenuRef}
          id="mobile-primary-menu"
          aria-label="Mobile primary"
          variants={reducedMotion ? reducedMenuVariants : menuVariants}
          initial={false}
          animate={menuOpen ? 'open' : 'closed'}
          inert={!menuOpen}
          className="absolute inset-x-0 top-0 max-h-[calc(100dvh-64px)] overflow-y-auto border-b border-white/10 bg-[#080F1F]/[0.98] px-4 pb-5 pt-3 shadow-[0_18px_40px_rgba(0,0,0,0.38)] sm:px-6"
        >
          <div className="mx-auto max-w-2xl">
            <div className="space-y-1">
              {sectionLinks.map((link) => renderSectionLink(link, true))}
            </div>
            <motion.div variants={reducedMotion ? reducedMenuLinkVariants : menuLinkVariants} className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
              <a
                href="/arooj-fatima-resume.pdf"
                download="Arooj-Fatima-Resume.pdf"
                className="inline-flex min-h-12 items-center gap-2 rounded-lg px-3 text-sm font-medium text-[#D7DFEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]"
              >
                <FileDown size={16} aria-hidden="true" />
                Resume
              </a>
              <SocialLinks />
            </motion.div>
          </div>
        </motion.nav>
      </motion.div>
    </>
  );
}
