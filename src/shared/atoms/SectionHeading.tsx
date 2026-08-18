import type { SectionHeading as SectionHeadingModel } from '@/types/landing';

interface SectionHeadingProps {
  readonly heading: SectionHeadingModel;
  readonly titleId: string;
  readonly split?: boolean;
  readonly centered?: boolean;
  readonly lineBreak?: boolean;
}

export const SectionHeading = ({ heading, titleId, split = false, centered = false, lineBreak = false }: SectionHeadingProps) => (
  <div className={`section-heading reveal ${split ? 'split-heading' : ''} ${centered ? 'centered' : ''}`}>
    <div>
      <p className="section-index">{heading.index}</p>
      <h2 id={titleId}>
        {heading.title} {lineBreak ? <br /> : null}
        {heading.emphasis ? <em>{heading.emphasis}</em> : null}
      </h2>
    </div>
    {heading.body ? <p className={split ? undefined : 'heading-copy'}>{heading.body}</p> : null}
  </div>
);
