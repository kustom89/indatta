import { SectionHeading } from '@/shared/atoms/SectionHeading';
import { TagList } from '@/shared/molecules/TagList';
import type { LandingContent } from '@/types/landing';

const iconSlots: Record<string, number> = { 'solution-icon': 3, 'solution-orb': 3, 'mini-chart': 5, 'flow-icon': 3 };

export const SolutionsSection = ({ content }: { readonly content: LandingContent }) => (
  <section className="slice solutions" id="soluciones" data-theme="dark" aria-labelledby="solutions-title">
    <div className="shell">
      <SectionHeading heading={content.solutions.heading} titleId="solutions-title" />
      <div className="solutions-bento">
        {content.solutions.cards.map((card) => (
          <article className={`solution-block reveal ${card.className}`} key={card.index}>
            <div className="solution-top">
              <span>{card.index}</span>
              <div className={card.iconClass} aria-hidden="true">
                {Array.from({ length: iconSlots[card.iconClass] }, (_, index) => <i key={index}></i>)}
              </div>
            </div>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
            <TagList tags={card.tags} />
            <dl className="solution-example">
              <div><dt>Desafío</dt><dd>{card.challenge}</dd></div>
              <div><dt>Resultado</dt><dd>{card.result}</dd></div>
            </dl>
          </article>
        ))}
      </div>
      <div className="solution-note reveal">
        <strong>{content.solutions.noteStrong}</strong>
        <span>{content.solutions.noteText}</span>
      </div>
    </div>
  </section>
);
