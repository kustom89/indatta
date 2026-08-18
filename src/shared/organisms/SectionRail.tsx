import type { NavItem } from '@/types/landing';

interface SectionRailProps {
  readonly items: readonly NavItem[];
  readonly activeHref: string;
}

export const SectionRail = ({ items, activeHref }: SectionRailProps) => (
  <nav className="section-rail" aria-label="Navegación por secciones">
    {items.map((item) => (
      <a key={item.href} href={item.href} aria-label={item.label} aria-current={activeHref === item.href ? 'location' : undefined}>
        <span>{item.label}</span>
      </a>
    ))}
  </nav>
);
