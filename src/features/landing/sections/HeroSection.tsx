import type { CSSProperties } from 'react';
import { CtaButton } from '@/shared/atoms/CtaButton';
import type { LandingContent } from '@/types/landing';

interface SectionProps {
  readonly content: LandingContent;
}

export const HeroSection = ({ content }: SectionProps) => (
  <section className="slice hero" id="hero" data-theme="dark" aria-labelledby="hero-title">
    <div className="hero-ambient" aria-hidden="true"></div>
    <div className="shell hero-layout">
      <div className="hero-copy reveal">
        <p className="kicker">
          {content.hero.kicker.map((item, index) => (
            <span key={item}>
              {item}
              {index < content.hero.kicker.length - 1 ? <i></i> : null}
            </span>
          ))}
        </p>
        <h1 id="hero-title">
          {content.hero.headingLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
          <em>{content.hero.headingEmphasis}</em>
        </h1>
        <p className="hero-lede">{content.hero.lede}</p>
        <div className="hero-actions">
          {content.hero.actions.map((cta) => (
            <CtaButton key={cta.href} cta={cta} />
          ))}
        </div>
        <ul className="capability-line" aria-label="Capacidades principales">
          {content.hero.capabilities.map((capability) => (
            <li key={capability}>{capability}</li>
          ))}
        </ul>
      </div>
      <div className="hero-system reveal" aria-label="Visualización: distintas fuentes se conectan con datos e inteligencia para generar acciones">
        <div className="system-grid" aria-hidden="true"></div>
        <div className="system-label label-sources">
          Sources <b>08 connected</b>
        </div>
        <div className="source-stack" aria-hidden="true">
          {['ERP', 'CRM', 'APIs', 'Docs', 'Cloud'].map((source, index) => (
            <span key={source} style={{ '--i': index } as CSSProperties}>
              {source}
            </span>
          ))}
        </div>
        <svg className="system-lines" viewBox="0 0 660 560" aria-hidden="true">
          <defs>
            <linearGradient id="flowGradient" x1="0" x2="1">
              <stop stopColor="#1B6FB8" />
              <stop offset=".55" stopColor="#3CB8EC" />
              <stop offset="1" stopColor="#2FB37A" />
            </linearGradient>
          </defs>
          <path d="M108 126 C218 126 202 280 318 280" />
          <path d="M108 200 C216 200 215 280 318 280" />
          <path d="M108 276 H318" />
          <path d="M108 352 C216 352 215 280 318 280" />
          <path d="M108 426 C218 426 202 280 318 280" />
          <path className="out" d="M342 280 C448 280 444 142 554 142" />
          <path className="out" d="M342 280 H554" />
          <path className="out" d="M342 280 C448 280 444 418 554 418" />
        </svg>
        <div className="data-core" aria-hidden="true">
          <span className="core-ring r1"></span>
          <span className="core-ring r2"></span>
          <span className="core-dot"></span>
          <strong>DATA</strong>
          <small>Unified context</small>
        </div>
        <div className="intelligence-chip" aria-hidden="true">
          <span>AI</span>
          <div>
            <b>Intelligence layer</b>
            <small>models · agents · analytics</small>
          </div>
        </div>
        <div className="action-stack" aria-hidden="true">
          <span><i></i><b>Decide</b><small>Recommendation</small></span>
          <span><i></i><b>Automate</b><small>Workflow active</small></span>
          <span><i></i><b>Execute</b><small>Action verified</small></span>
        </div>
        <div className="system-status" aria-hidden="true">
          <span></span> Data flow active <b>24 ms</b>
        </div>
      </div>
    </div>
    <a className="scroll-cue" href="#desafio">
      <span>Explorar</span>
      <i aria-hidden="true"></i>
    </a>
  </section>
);
