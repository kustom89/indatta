import { SectionHeading } from '@/shared/atoms/SectionHeading';
import type { LandingContent } from '@/types/landing';

export const MethodSection = ({ content }: { readonly content: LandingContent }) => (
  <section className="slice method" id="metodo" data-theme="blue" aria-labelledby="method-title">
    <div className="shell">
      <SectionHeading heading={content.method.heading} titleId="method-title" split />
      <ol className="method-track reveal">
        {content.method.steps.map((step) => (
          <li key={step.index}><span>{step.index}</span><i aria-hidden="true"></i><div><h3>{step.title}</h3><p>{step.body}</p></div></li>
        ))}
      </ol>
      <div className="method-stack reveal"><span>{content.method.stackLabel}</span><p>{content.method.stackText}</p></div>
      <p className="method-manifesto reveal">{content.method.manifestoStart} <span>{content.method.manifestoEmphasis}</span> {content.method.manifestoEnd}</p>
    </div>
  </section>
);
