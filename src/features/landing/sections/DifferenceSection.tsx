import { SectionHeading } from '@/shared/atoms/SectionHeading';
import type { LandingContent } from '@/types/landing';

export const DifferenceSection = ({ content }: { readonly content: LandingContent }) => (
  <section className="slice difference" id="diferencial" data-theme="dark" aria-labelledby="difference-title">
    <div className="shell">
      <SectionHeading heading={content.difference.heading} titleId="difference-title" />
      <div className="difference-grid">
        <div className="principles reveal">
          {content.difference.principles.map((principle) => (
            <article key={principle.index}><span>{principle.index}</span><div><h3>{principle.title}</h3><p>{principle.body}</p></div></article>
          ))}
        </div>
        <div className="portal-card reveal" aria-label="Ejemplo de lo que siempre puedes ver en el portal de tu proyecto">
          <div className="portal-card-top"><div><img src={content.brand.glyphMono} alt="" width="26" height="26" /><span>Project Portal</span></div><i></i></div>
          <span className="ui-label">Lo que siempre puedes ver, no un dashboard aislado</span>
          <ul className="portal-checklist">
            {content.difference.portalItems.map((item) => (
              <li key={item.title}><b aria-hidden="true">✓</b><div><strong>{item.title}</strong><small>{item.body}</small></div></li>
            ))}
          </ul>
          <div className="milestone"><span>Disponible desde</span><strong>El primer día</strong><small>No al final del proyecto, ver la demo completa en el showcase ↑</small></div>
        </div>
      </div>
      <div className="visibility-message reveal">
        <span>{content.difference.visibility.index}</span>
        <h3>{content.difference.visibility.title}</h3>
        <p>{content.difference.visibility.body}</p>
      </div>
    </div>
  </section>
);
