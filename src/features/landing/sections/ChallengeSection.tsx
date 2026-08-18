import { SectionHeading } from '@/shared/atoms/SectionHeading';
import type { LandingContent } from '@/types/landing';

const iconSlots: Record<string, number> = { broken: 3, delay: 1, scatter: 4, radar: 1, islands: 2 };

export const ChallengeSection = ({ content }: { readonly content: LandingContent }) => (
  <section className="slice challenge" id="desafio" data-theme="light" aria-labelledby="challenge-title">
    <div className="shell">
      <SectionHeading heading={content.challenge.heading} titleId="challenge-title" split lineBreak />
      <div className="problem-grid">
        {content.challenge.cards.map((card) => (
          <article className="problem-card reveal" key={card.index}>
            <span>{card.index}</span>
            <div className={`problem-symbol ${card.iconClass}`} aria-hidden="true">
              {card.symbol ?? Array.from({ length: iconSlots[card.iconClass] ?? 0 }, (_, index) => <i key={index}></i>)}
            </div>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </article>
        ))}
      </div>
      <div className="challenge-close reveal">
        <span className="brand-glyph">
          <img src={content.brand.glyph} alt="" width="48" height="48" />
        </span>
        <p>
          <strong>{content.challenge.closeStrong}</strong> {content.challenge.closeText}
        </p>
      </div>
    </div>
  </section>
);
