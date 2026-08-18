import { useEffect, useState } from 'react';
import { BrandLogo } from '@/shared/atoms/BrandLogo';
import type { NavItem } from '@/types/landing';

interface SiteNavProps {
  readonly items: readonly NavItem[];
  readonly activeHref: string;
  readonly light: boolean;
  readonly logo: string;
}

export const SiteNav = ({ items, activeHref, light, logo }: SiteNavProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onEscape);
    return () => document.removeEventListener('keydown', onEscape);
  }, []);

  return (
    <header className={`site-nav ${light ? 'is-light' : ''}`} id="siteNav">
      <div className="nav-shell">
        <a className="brand" href="#hero" aria-label="INDATTA, inicio">
          <BrandLogo src={logo} alt="INDATTA" />
        </a>
        <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="mainNav" onClick={() => setMenuOpen((open) => !open)}>
          <span className="menu-icon" aria-hidden="true">
            <i></i>
            <i></i>
          </span>
          <span>Menú</span>
        </button>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} id="mainNav" aria-label="Navegación principal">
          {items.map((item, index) => (
            <a key={item.href} href={item.href} className={index === items.length - 1 ? 'nav-cta' : undefined} aria-current={activeHref === item.href ? 'location' : undefined} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};
