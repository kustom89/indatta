import { Fragment } from 'react';
import { SectionHeading } from '@/shared/atoms/SectionHeading';
import type { LandingContent } from '@/types/landing';

export const DiaSection = ({ content }: { readonly content: LandingContent }) => (
  <section className="slice dia" id="flujo" data-theme="blue" aria-labelledby="dia-title">
    <div className="shell">
      <SectionHeading heading={content.dia.heading} titleId="dia-title" centered />
      <div className="dia-flow reveal" aria-label="Data, Intelligence y Action conectadas">
        {content.dia.stages.map((stage, index) => (
          <Fragment key={stage.index}>
            <article className={`dia-stage ${stage.className}`}>
              <span className="stage-num">{stage.index}</span>
              <div className="stage-node"><i></i><b>{stage.node}</b></div>
              <h3>{stage.title}</h3>
              <ul>
                {stage.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <div className="flow-stat"><span>{stage.statLabel}</span><strong>{stage.statValue}</strong><small>{stage.statDetail}</small></div>
            </article>
            {index < content.dia.stages.length - 1 ? <div className="dia-connector" aria-hidden="true"><span></span><i></i><i></i><i></i></div> : null}
          </Fragment>
        ))}
      </div>
    </div>
  </section>
);
