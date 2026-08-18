import { BrandLogo } from '@/shared/atoms/BrandLogo';
import type { LandingContent } from '@/types/landing';

interface SiteFooterProps {
  readonly content: LandingContent;
}

export const SiteFooter = ({ content }: SiteFooterProps) => (
  <footer className="site-footer">
    <div className="shell footer-main">
      <div>
        <BrandLogo src={content.brand.lockupInverse} alt="INDATTA" />
        <p>{content.brand.tagline}</p>
      </div>
      <nav aria-label="Navegación secundaria">
        {content.footerNav.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="footer-contact">
        <a href={`mailto:${content.brand.email}`}>{content.brand.email}</a>
        <span>{content.brand.location}</span>
      </div>
    </div>
    <div className="shell footer-bottom">
      <span>© {new Date().getFullYear()} INDATTA. Todos los derechos reservados.</span>
      <span>Data → Intelligence → Action</span>
    </div>
  </footer>
);
