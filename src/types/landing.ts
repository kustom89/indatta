export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export interface Cta {
  readonly label: string;
  readonly href: string;
  readonly variant?: 'primary' | 'quiet';
  readonly icon?: string;
}

export interface SectionHeading {
  readonly index: string;
  readonly title: string;
  readonly emphasis?: string;
  readonly body?: string;
}

export interface ProblemCard {
  readonly index: string;
  readonly title: string;
  readonly body: string;
  readonly iconClass: 'broken' | 'repeat' | 'delay' | 'scatter' | 'radar' | 'islands';
  readonly symbol?: string;
}

export interface SolutionCard {
  readonly index: string;
  readonly title: string;
  readonly body: string;
  readonly tags: readonly string[];
  readonly className: 'solution-data' | 'solution-ai' | 'solution-analytics' | 'solution-automation';
  readonly iconClass: 'solution-icon' | 'solution-orb' | 'mini-chart' | 'flow-icon';
  readonly challenge: string;
  readonly result: string;
}

export interface DiaStage {
  readonly index: string;
  readonly title: string;
  readonly node: string;
  readonly items: readonly string[];
  readonly className: 'stage-data' | 'stage-intelligence' | 'stage-action';
  readonly statLabel: string;
  readonly statValue: string;
  readonly statDetail: string;
}

export interface ShowcaseTab {
  readonly id: 'platform' | 'copilot' | 'decision' | 'portal';
  readonly label: string;
}

export interface MethodStep {
  readonly index: string;
  readonly title: string;
  readonly body: string;
}

export interface Principle {
  readonly index: string;
  readonly title: string;
  readonly body: string;
}

export interface LandingContent {
  readonly apiBase: string;
  readonly whatsappNumber: string;
  readonly brand: {
    readonly name: string;
    readonly lockup: string;
    readonly lockupInverse: string;
    readonly glyph: string;
    readonly glyphMono: string;
    readonly tagline: string;
    readonly email: string;
    readonly location: string;
  };
  readonly nav: readonly NavItem[];
  readonly footerNav: readonly NavItem[];
  readonly hero: {
    readonly headingLines: readonly string[];
    readonly headingEmphasis: string;
    readonly lede: string;
    readonly kicker: readonly string[];
    readonly actions: readonly Cta[];
    readonly capabilities: readonly string[];
  };
  readonly challenge: {
    readonly heading: SectionHeading;
    readonly cards: readonly ProblemCard[];
    readonly closeStrong: string;
    readonly closeText: string;
  };
  readonly solutions: {
    readonly heading: SectionHeading;
    readonly cards: readonly SolutionCard[];
    readonly noteStrong: string;
    readonly noteText: string;
  };
  readonly dia: {
    readonly heading: SectionHeading;
    readonly stages: readonly DiaStage[];
  };
  readonly showcase: {
    readonly heading: SectionHeading;
    readonly tabs: readonly ShowcaseTab[];
    readonly demoBadge: string;
  };
  readonly method: {
    readonly heading: SectionHeading;
    readonly steps: readonly MethodStep[];
    readonly stackLabel: string;
    readonly stackText: string;
    readonly manifestoStart: string;
    readonly manifestoEmphasis: string;
    readonly manifestoEnd: string;
  };
  readonly difference: {
    readonly heading: SectionHeading;
    readonly principles: readonly Principle[];
    readonly portalItems: readonly { title: string; body: string }[];
    readonly visibility: SectionHeading;
  };
  readonly contact: {
    readonly industries: readonly string[];
    readonly industryHeading: string;
    readonly industryBody: string;
    readonly heading: SectionHeading;
    readonly path: readonly string[];
    readonly directLabel: string;
    readonly solutionOptions: readonly string[];
    readonly channels: readonly string[];
    readonly submitByChannel: Record<string, string>;
    readonly okByChannel: Record<string, string>;
    readonly consent: string;
    readonly globalNote: string;
  };
}
