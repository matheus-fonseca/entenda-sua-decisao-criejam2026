/**
 * DADOS FICTÍCIOS DE DEMONSTRAÇÃO do painel de gestão.
 * Todas as séries são calculadas por fórmula (sem aleatoriedade), então os mesmos
 * números aparecem a cada carregamento. Não representam nenhum tribunal real.
 */

export type Branch = "trabalhista" | "federal" | "estadual";

/** Dias de histórico simulado (2 anos), para comparar o último ano com o ano anterior. */
export const DAYS = 730;

export interface DailyPoint {
  /** Data no formato AAAA-MM-DD e rótulo dd/mm. */
  date: string;
  label: string;
  /** Decisões recebidas para explicação. */
  received: number;
  /** Explicações publicadas ao cidadão. */
  explained: number;
  /** Decisões em que a IA respondeu "não entendi". */
  notUnderstood: number;
  /** Decisões reprovadas pelo revisor e enviadas à revisão humana. */
  humanReview: number;
  /** Explicações corrigidas pelo agente Revisor antes de publicar. */
  corrected: number;
  /** Avaliações recebidas ("Essa explicação foi útil?") e quantas foram "Sim". */
  responses: number;
  useful: number;
  /** Explicações auditadas por pessoas (amostra) e quantas foram corrigidas por revisor humano após a auditoria. */
  audited: number;
  humanCorrected: number;
  /** Explicações abertas pelo cidadão e quantas levaram à leitura do documento original. */
  viewed: number;
  originalRead: number;
  /** Encaminhamentos ao Balcão Virtual. */
  balcao: number;
  citizens: number;
  newCitizens: number;
  listen: number;
  libras: number;
  notifications: number;
  /** Tempo da publicação da decisão até a explicação (segundos) e custo por explicação (R$). */
  latencyMedian: number;
  latencyP95: number;
  cost: number;
}

interface BranchProfile {
  label: string;
  tribunals: string;
  base: number;
  growth: number;
  phase: number;
  usefulStart: number;
  usefulTrend: number;
  notUnderstoodStart: number;
  notUnderstoodTrend: number;
  humanReviewStart: number;
  humanReviewTrend: number;
  errorStart: number;
  errorTrend: number;
  correctionRate: number;
  balcaoRate: number;
  latencyMedian: number;
  latencyP95: number;
  cost: number;
}

export const branchProfiles: Record<Branch, BranchProfile> = {
  trabalhista: {
    label: "Justiça do Trabalho",
    tribunals: "TRTs",
    base: 300,
    growth: 0.022,
    phase: 0.3,
    usefulStart: 0.84,
    usefulTrend: 0.001,
    notUnderstoodStart: 0.075,
    notUnderstoodTrend: -0.0006,
    humanReviewStart: 0.06,
    humanReviewTrend: -0.0005,
    errorStart: 0.014,
    errorTrend: -0.00018,
    correctionRate: 0.06,
    balcaoRate: 0.055,
    latencyMedian: 20,
    latencyP95: 65,
    cost: 0.11,
  },
  federal: {
    label: "Justiça Federal",
    tribunals: "TRFs",
    base: 240,
    growth: 0.026,
    phase: 1.4,
    usefulStart: 0.81,
    usefulTrend: 0.0012,
    notUnderstoodStart: 0.095,
    notUnderstoodTrend: -0.0007,
    humanReviewStart: 0.07,
    humanReviewTrend: -0.0005,
    errorStart: 0.018,
    errorTrend: -0.0002,
    correctionRate: 0.08,
    balcaoRate: 0.07,
    latencyMedian: 20,
    latencyP95: 65,
    cost: 0.13,
  },
  estadual: {
    label: "Justiça Estadual",
    tribunals: "TJs",
    base: 380,
    growth: 0.02,
    phase: 2.5,
    usefulStart: 0.78,
    usefulTrend: 0.0011,
    notUnderstoodStart: 0.12,
    notUnderstoodTrend: -0.0008,
    humanReviewStart: 0.08,
    humanReviewTrend: -0.0006,
    errorStart: 0.022,
    errorTrend: -0.00022,
    correctionRate: 0.09,
    balcaoRate: 0.085,
    latencyMedian: 20,
    latencyP95: 65,
    cost: 0.14,
  },
};

export const branches = Object.keys(branchProfiles) as Branch[];

/** Último dia da série ("hoje"; fixo para os dados não mudarem a cada acesso). */
const SERIES_END = Date.UTC(2026, 10, 13);
const DAY_MS = 24 * 60 * 60 * 1000;

function dateAt(index: number): Date {
  return new Date(SERIES_END - (DAYS - 1 - index) * DAY_MS);
}

/** Data (AAAA-MM-DD) de um dia da série. */
export function isoAt(index: number): string {
  return dateAt(index).toISOString().slice(0, 10);
}

/** Primeiro e último dia disponíveis (AAAA-MM-DD). */
export const FIRST_DATE = isoAt(0);
export const LAST_DATE = isoAt(DAYS - 1);

function dayLabel(index: number): string {
  const date = dateAt(index);
  return `${String(date.getUTCDate()).padStart(2, "0")}/${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}

/** Fração das explicações que recebem uma avaliação (Sim/Não): poucos cidadãos clicam nos botões. */
export const RESPONSE_RATE = 0.15;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** Peso de cada dia da semana (fim de semana tem menos decisões); média 1. */
const WEEKDAY_WEIGHT = [0.2, 1.15, 1.15, 1.15, 1.15, 1.15, 0.35].map((w) => w / 0.9);

function buildSeries(profile: BranchProfile): DailyPoint[] {
  // As correções humanas são poucas por dia; acumular o valor esperado evita que o arredondamento as zere.
  let expectedCorrections = 0;
  let roundedCorrections = 0;
  const growthRate = Math.log(1 + profile.growth * 52) / 52;
  return Array.from({ length: DAYS }, (_, d) => {
    // Semanas em relação ao início do último ano: as tendências valem de -52 (ano anterior) a +52.
    const w = (d - (DAYS - 364)) / 7;
    const weekday = dateAt(d).getUTCDay();
    const received = Math.round(
      (profile.base / 7) * Math.exp(growthRate * w) * WEEKDAY_WEIGHT[weekday] * (1 + 0.07 * Math.sin(d * 0.11 + profile.phase)),
    );
    const notUnderstood = Math.round(received * clamp(profile.notUnderstoodStart + profile.notUnderstoodTrend * w, 0.02, 0.2));
    const humanReview = Math.round(received * clamp(profile.humanReviewStart + profile.humanReviewTrend * w, 0.02, 0.15));
    const explained = received - notUnderstood - humanReview;
    const citizens = Math.round(explained * 0.64);
    const responses = Math.round(explained * RESPONSE_RATE);
    const audited = Math.round(explained * 0.12);
    expectedCorrections += audited * clamp(profile.errorStart + profile.errorTrend * w, 0.001, 0.05);
    const humanCorrected = Math.round(expectedCorrections) - roundedCorrections;
    roundedCorrections += humanCorrected;
    return {
      date: isoAt(d),
      label: dayLabel(d),
      received,
      explained,
      notUnderstood,
      humanReview,
      corrected: Math.round(explained * profile.correctionRate),
      responses,
      useful: Math.round(responses * clamp(profile.usefulStart + profile.usefulTrend * w, 0.5, 0.97)),
      audited,
      humanCorrected,
      viewed: Math.round(explained * clamp(0.6 + 0.001 * w, 0.5, 0.7)),
      originalRead: Math.round(explained * clamp(0.12 + 0.0004 * w, 0.08, 0.16)),
      balcao: Math.round(explained * profile.balcaoRate),
      citizens,
      newCitizens: Math.round(citizens * clamp(0.5 - 0.004 * w, 0.25, 0.7)),
      listen: Math.round(citizens * clamp(0.28 + 0.0008 * w, 0.2, 0.4)),
      libras: Math.round(citizens * clamp(0.035 + 0.0003 * w, 0.02, 0.06)),
      notifications: Math.round(citizens * clamp(0.5 + 0.002 * w, 0.3, 0.7)),
      latencyMedian: profile.latencyMedian,
      latencyP95: profile.latencyP95,
      cost: Math.round(profile.cost * (1 - 0.002 * w) * 1000) / 1000,
    };
  });
}

export const dailyByBranch: Record<Branch, DailyPoint[]> = {
  trabalhista: buildSeries(branchProfiles.trabalhista),
  federal: buildSeries(branchProfiles.federal),
  estadual: buildSeries(branchProfiles.estadual),
};

export interface DecisionTypeProfile {
  id: string;
  label: string;
  /** Participação no volume e compreensão de referência (0–1). */
  share: number;
  base: number;
}

export const decisionTypes: DecisionTypeProfile[] = [
  { id: "simples", label: "Sentença simples (1 pedido)", share: 0.34, base: 0.92 },
  { id: "previdenciario", label: "Previdenciário", share: 0.22, base: 0.89 },
  { id: "acordao", label: "Acórdãos", share: 0.26, base: 0.78 },
  { id: "varios", label: "Sentença com vários pedidos", share: 0.18, base: 0.61 },
];

/** Ajuste da compreensão de cada tipo conforme o ramo. */
export const branchTypeDelta: Record<Branch, number> = { trabalhista: 0.02, federal: 0, estadual: -0.03 };
