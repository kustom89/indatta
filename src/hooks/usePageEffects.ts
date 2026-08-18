import { useEffect, useState } from 'react';

export const usePageEffects = () => {
  const [activeHref, setActiveHref] = useState('#hero');
  const [navIsLight, setNavIsLight] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main > .slice'));
    let activeSection = 0;

    const setActiveSection = (index: number) => {
      const section = sections[index];
      if (!section) return;
      activeSection = index;
      setActiveHref(`#${section.id}`);
      setNavIsLight(section.dataset.theme === 'light');
    };

    let sectionObserver: IntersectionObserver | undefined;
    if (sections.length && 'IntersectionObserver' in window) {
      sectionObserver = new IntersectionObserver(
        (entries) => {
          const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          const current = visible[0]?.target;
          if (current) setActiveSection(sections.indexOf(current as HTMLElement));
        },
        { rootMargin: '-24% 0px -58% 0px', threshold: [0, 0.1, 0.25, 0.5] },
      );
      sections.forEach((section) => sectionObserver?.observe(section));
    } else {
      setActiveSection(0);
    }

    const revealItems = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    let revealObserver: IntersectionObserver | undefined;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
    } else {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            revealObserver?.unobserve(entry.target);
          });
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
      );
      revealItems.forEach((item) => revealObserver?.observe(item));
    }

    const onKeydown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (!['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp'].includes(event.key)) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, button, a, [role='tab'], [contenteditable='true']")) return;
      const direction = event.key === 'ArrowDown' || event.key === 'PageDown' ? 1 : -1;
      const next = Math.max(0, Math.min(sections.length - 1, activeSection + direction));
      if (next === activeSection) return;
      event.preventDefault();
      sections[next]?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    };

    document.addEventListener('keydown', onKeydown);

    return () => {
      sectionObserver?.disconnect();
      revealObserver?.disconnect();
      document.removeEventListener('keydown', onKeydown);
      document.body.classList.remove('menu-open');
    };
  }, []);

  return { activeHref, navIsLight };
};
