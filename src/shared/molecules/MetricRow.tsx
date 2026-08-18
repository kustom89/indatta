import type { CSSProperties } from 'react';

export const MetricRow = () => (
  <div className="metric-row">
    <div>
      <span>Data quality</span>
      <strong>97.8%</strong>
      <i style={{ '--value': '97.8%' } as CSSProperties}></i>
    </div>
    <div>
      <span>Pipelines active</span>
      <strong>42</strong>
      <small>+6 this month</small>
    </div>
    <div>
      <span>Sources connected</span>
      <strong>18</strong>
      <small>all systems</small>
    </div>
    <div>
      <span>Last update</span>
      <strong>2 min</strong>
      <small>streaming</small>
    </div>
  </div>
);
