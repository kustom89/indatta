import { useEffect, useMemo, useRef, useState } from 'react';
import { SectionHeading } from '@/shared/atoms/SectionHeading';
import { MetricRow } from '@/shared/molecules/MetricRow';
import type { LandingContent } from '@/types/landing';

export const ShowcaseSection = ({ content }: { readonly content: LandingContent }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [visible, setVisible] = useState(true);
  const frameRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | undefined>(undefined);
  const activePanel = useMemo(() => content.showcase.tabs[activeIndex]?.id ?? 'platform', [activeIndex, content.showcase.tabs]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => setVisible(!!entries[0]?.isIntersecting), { threshold: 0.18 });
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    window.clearTimeout(timerRef.current);
    if (paused || !visible || content.showcase.tabs.length < 2) return;
    timerRef.current = window.setTimeout(() => setActiveIndex((index) => (index + 1) % content.showcase.tabs.length), 6000);
    return () => window.clearTimeout(timerRef.current);
  }, [activeIndex, content.showcase.tabs.length, paused, visible]);

  const activate = (index: number, manual = false) => {
    setActiveIndex(index);
    if (manual) setPaused(true);
  };

  const onTabKey = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const count = content.showcase.tabs.length;
    let next: number | undefined;
    if (event.key === 'ArrowRight') next = (index + 1) % count;
    if (event.key === 'ArrowLeft') next = (index - 1 + count) % count;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = count - 1;
    if (next === undefined) return;
    event.preventDefault();
    activate(next, true);
    document.getElementById(`tab-${content.showcase.tabs[next]?.id}`)?.focus();
  };

  return (
    <section className="slice showcase" id="showcase" data-theme="light" aria-labelledby="showcase-title">
      <div className="shell">
        <SectionHeading heading={content.showcase.heading} titleId="showcase-title" split />
        <div className="showcase-frame reveal" ref={frameRef}>
          <div className="showcase-bar">
            <div className="window-dots" aria-hidden="true"><i></i><i></i><i></i></div>
            <div className="showcase-tabs" role="tablist" aria-label="Ejemplos de soluciones">
              {content.showcase.tabs.map((tab, index) => (
                <button key={tab.id} id={`tab-${tab.id}`} type="button" role="tab" aria-selected={activeIndex === index} aria-controls={`panel-${tab.id}`} tabIndex={activeIndex === index ? 0 : -1} onClick={() => activate(index, true)} onKeyDown={(event) => onTabKey(event, index)}>
                  {tab.label}
                </button>
              ))}
            </div>
            <span className="demo-badge">{content.showcase.demoBadge}</span>
            <button className="autoplay-control" type="button" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>
              <span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span><b>{paused ? 'Reproducir' : 'Pausar'}</b>
            </button>
          </div>
          <PlatformPanel active={activePanel === 'platform'} />
          <CopilotPanel active={activePanel === 'copilot'} glyph={content.brand.glyphMono} />
          <DecisionPanel active={activePanel === 'decision'} />
          <PortalPanel active={activePanel === 'portal'} glyph={content.brand.glyphMono} />
          <div className="showcase-progress" aria-hidden="true"><i className={!paused && visible ? 'is-running' : undefined}></i></div>
        </div>
      </div>
    </section>
  );
};

const PlatformPanel = ({ active }: { readonly active: boolean }) => (
  <div className={`showcase-panel ${active ? 'is-active' : ''}`} id="panel-platform" role="tabpanel" aria-labelledby="tab-platform" hidden={!active}>
    <div className="panel-head"><div><span className="ui-label">Data platform / overview</span><h3>Un ecosistema de datos conectado</h3></div><span className="live-pill"><i></i> Live</span></div>
    <div className="platform-map">
      {['Sources', 'Pipelines', 'Platform', 'Consumers'].map((group, index) => (
        <div className={`map-column ${index === 1 ? 'emphasis' : ''}`} key={group}>
          <b>{group}</b>
          {(index === 0 ? ['ERP 12k/s', 'CRM 8k/s', 'APIs 24k/s'] : index === 1 ? ['Ingestion Active', 'Streaming Active', 'Transform Active'] : index === 2 ? ['Lakehouse Ready', 'Governance 98%', 'Quality 97.8%'] : ['Analytics', 'AI', 'Apps']).map((item) => <span key={item}>{item}</span>)}
        </div>
      ))}
    </div>
    <MetricRow />
  </div>
);

const CopilotPanel = ({ active, glyph }: { readonly active: boolean; readonly glyph: string }) => (
  <div className={`showcase-panel ${active ? 'is-active' : ''}`} id="panel-copilot" role="tabpanel" aria-labelledby="tab-copilot" hidden={!active}>
    <div className="copilot-shell">
      <aside><div className="copilot-brand"><img src={glyph} alt="" width="30" height="30" /><b>AI Copilot</b></div><nav><span className="active">Nueva consulta</span><span>Análisis recientes</span><span>Reportes</span><span>Fuentes</span></nav><div className="source-count"><strong>148</strong><span>fuentes conectadas</span></div></aside>
      <div className="copilot-chat"><span className="ui-label">Conversación / ventas</span><div className="question">¿Cómo evolucionaron nuestras ventas durante los últimos 6 meses?</div><div className="answer"><span className="ai-mark">AI</span><div><p>Las ventas aumentaron <strong>14,8%</strong> durante el período.</p><ul><li><span>Canal Digital</span><b className="up">+21%</b></li><li><span>Región Centro</span><b className="up">+16%</b></li><li><span>Producto B</span><b className="down">−4%</b></li></ul><div className="chat-actions"><button type="button">Ver análisis</button><button type="button">Generar reporte</button><button type="button">Consultar fuentes</button></div></div></div></div>
    </div>
  </div>
);

const DecisionPanel = ({ active }: { readonly active: boolean }) => (
  <div className={`showcase-panel ${active ? 'is-active' : ''}`} id="panel-decision" role="tabpanel" aria-labelledby="tab-decision" hidden={!active}>
    <div className="decision-layout">
      <div className="decision-main"><span className="ui-label">Performance overview</span><div className="kpi-strip"><div><span>Revenue</span><strong>$2.48M</strong><small>+14.8%</small></div><div><span>Growth</span><strong>18.2%</strong><small>above target</small></div><div><span>Forecast</span><strong>94.6%</strong><small>accuracy</small></div><div><span>Alerts</span><strong>03</strong><small className="warn">require action</small></div></div><div className="trend-chart" aria-label="Gráfico conceptual de tendencia positiva"><span>Performance trend</span><svg viewBox="0 0 720 220" aria-hidden="true"><defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#3CB8EC" stopOpacity=".34" /><stop offset="1" stopColor="#3CB8EC" stopOpacity="0" /></linearGradient></defs><path className="area" d="M0 185 C100 168 120 156 185 165 S285 116 360 127 S480 86 545 96 S640 52 720 42 L720 220 L0 220Z" /><path className="line" d="M0 185 C100 168 120 156 185 165 S285 116 360 127 S480 86 545 96 S640 52 720 42" /></svg></div></div>
      <aside className="insight-panel"><span className="ui-label">AI insight</span><strong>82%</strong><p>de probabilidad de superar el objetivo mensual.</p><div className="recommended"><span>Recommended action</span><p>Incrementar capacidad en canal digital.</p><button type="button">Simular impacto <b>→</b></button></div></aside>
    </div>
  </div>
);

const PortalPanel = ({ active, glyph }: { readonly active: boolean; readonly glyph: string }) => (
  <div className={`showcase-panel ${active ? 'is-active' : ''}`} id="panel-portal" role="tabpanel" aria-labelledby="tab-portal" hidden={!active}>
    <div className="portal-layout">
      <aside className="portal-side"><div><img src={glyph} alt="" width="30" height="30" /><b>Project Portal</b></div><nav><span className="active">Overview</span><span>Roadmap</span><span>Deliverables</span><span>Decisions</span><span>Risks</span></nav><small>Data & AI Platform<br />v1.0 · Client workspace</small></aside>
      <div className="portal-main"><div className="panel-head"><div><span className="ui-label">Implementation / current status</span><h3>Data & AI Platform</h3></div><span className="portal-date">Updated today · 09:42</span></div><div className="progress-card"><div><span>Overall progress</span><strong>78%</strong></div><i><b></b></i></div><div className="project-status">{['Architecture', 'Integrations', 'Data Platform', 'Analytics', 'AI Copilot', 'Production'].map((item, index) => <div key={item}><span>{item}</span><b className={index === 0 ? 'complete' : index === 3 ? 'uat' : index === 4 ? 'pilot' : index === 5 ? 'pending' : undefined}>{index === 0 ? 'Complete' : index === 3 ? 'UAT' : index === 4 ? 'Pilot' : index === 5 ? 'Pending' : 'Development'}</b></div>)}</div></div>
    </div>
  </div>
);
