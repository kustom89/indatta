import { LeadForm } from '@/shared/organisms/LeadForm';
import type { LandingContent } from '@/types/landing';

export const ContactSection = ({ content }: { readonly content: LandingContent }) => (
  <section className="slice contact" id="contacto" data-theme="light" aria-labelledby="contact-title">
    <div className="shell">
      <div className="industries reveal">
        <div><p className="section-index">{content.contact.industryHeading}</p><p>{content.contact.industryBody}</p></div>
        <ul aria-label="Industrias">
          {content.contact.industries.map((industry) => <li key={industry}>{industry}</li>)}
        </ul>
      </div>
      <div className="contact-layout">
        <div className="contact-copy reveal">
          <p className="section-index">{content.contact.heading.index}</p>
          <h2 id="contact-title">{content.contact.heading.title}<br /><em>{content.contact.heading.emphasis}</em></h2>
          <p>{content.contact.heading.body}</p>
          <div className="contact-path" aria-label="Proceso inicial">
            {content.contact.path.map((step, index) => (
              <span key={step} className={index === 0 ? 'active' : undefined}>{step}{index < content.contact.path.length - 1 ? <i>→</i> : null}</span>
            ))}
          </div>
          <div className="contact-direct"><span>{content.contact.directLabel}</span><a href={`mailto:${content.brand.email}`}>{content.brand.email}</a></div>
        </div>
        <LeadForm content={content} />
      </div>
    </div>
  </section>
);
