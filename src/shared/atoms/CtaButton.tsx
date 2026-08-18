import type { Cta } from '@/types/landing';

interface CtaButtonProps {
  readonly cta: Cta;
}

export const CtaButton = ({ cta }: CtaButtonProps) => (
  <a className={`button ${cta.variant === 'quiet' ? 'button-quiet' : 'button-primary'}`} href={cta.href}>
    {cta.label}
    {cta.icon ? <span aria-hidden="true">{cta.icon}</span> : null}
  </a>
);
