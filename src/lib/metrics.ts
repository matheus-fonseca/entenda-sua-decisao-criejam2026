import {
  type Branch,
  DAYS,
  FIRST_DATE,
  LAST_DATE,
  RESPONSE_RATE,
  branchProfiles,
  branchTypeDelta,
  branches,
  dailyByBranch,
  decisionTypes,
  type DailyPoint,
} from "@/lib/data/metrics";

/**
 * Camada única de acesso aos números do painel de gestão (todos fictícios).
 * Os percentuais de "entendeu" e "não entendeu" usam todas as explicações como base,
 * porque só uma pequena parte dos cidadãos clica nos botões de avaliação.
 */

export type Period = "today" | "7d" | "30d" | "6m" | "1y" | "custom";
export type BranchFilter = "todos" | Branch;

/** `days` = tamanho da janela; o período "custom" usa as datas escolhidas. */
export const periodOptions: { value: Period; label: string; days: number }[] = [
  { value: "today", label: "Hoje", days: 1 },
  { value: "7d", label: "Últimos 7 dias", days: 7 },
  { value: "30d", label: "Últimos 30 dias", days: 30 },
  { value: "6m", label: "Últimos 6 meses", days: 183 },
  { value: "1y", label: "Último ano", days: 365 },
  { value: "custom", label: "Selecionar período", days: 0 },
];

/** Intervalo escolhido pelo usuário (AAAA-MM-DD), usado no período "Selecionar período". */
export interface DateRange {
  start: string;
  end: string;
}

export const DATE_LIMITS = { min: FIRST_DATE, max: LAST_DATE };

/** Intervalo inicial sugerido para "Selecionar período": os últimos 30 dias. */
export function defaultRange(): DateRange {
  return { start: dayIso(DAYS - 30), end: LAST_DATE };
}

const DAY_MS = 24 * 60 * 60 * 1000;
const firstTime = Date.parse(`${FIRST_DATE}T00:00:00Z`);

function dayIso(index: number): string {
  return new Date(firstTime + index * DAY_MS).toISOString().slice(0, 10);
}

function indexOfDate(iso: string): number {
  const value = Math.round((Date.parse(`${iso}T00:00:00Z`) - firstTime) / DAY_MS);
  return Math.min(DAYS - 1, Math.max(0, Number.isNaN(value) ? DAYS - 1 : value));
}

const formatDay = (iso: string) => `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}`;

/** Janela de dias (índices inclusivos) do período escolhido. */
function resolveWindow(period: Period, range: DateRange): { from: number; to: number } {
  if (period === "custom") {
    const a = indexOfDate(range.start);
    const b = indexOfDate(range.end);
    return { from: Math.min(a, b), to: Math.max(a, b) };
  }
  const days = periodOptions.find((p) => p.value === period)?.days ?? 30;
  return { from: DAYS - days, to: DAYS - 1 };
}

export const branchOptions: { value: BranchFilter; label: string }[] = [
  { value: "todos", label: "Todos os ramos" },
  ...branches.map((b) => ({ value: b as BranchFilter, label: branchProfiles[b].label })),
];

/** Limites usados nas sugestões: "não entendi" da IA e compreensão (entre quem avaliou) por tipo. */
export const TARGETS = { notUnderstood: 0.08, comprehension: 0.7 } as const;

interface Totals {
  received: number;
  explained: number;
  notUnderstood: number;
  humanReview: number;
  corrected: number;
  responses: number;
  useful: number;
  audited: number;
  humanCorrected: number;
  viewed: number;
  originalRead: number;
  balcao: number;
  citizens: number;
  newCitizens: number;
  listen: number;
  libras: number;
  notifications: number;
  latencyMedian: number;
  latencyP95: number;
  cost: number;
  /** Custo total no período (R$): custo por explicação × explicações de cada semana. */
  costTotal: number;
}

const sumKeys = [
  "received", "explained", "notUnderstood", "humanReview", "corrected", "responses", "useful",
  "audited", "humanCorrected", "viewed", "originalRead", "balcao", "citizens", "newCitizens",
  "listen", "libras", "notifications",
] as const;

function aggregate(points: DailyPoint[]): Totals {
  const total: Totals = {
    received: 0, explained: 0, notUnderstood: 0, humanReview: 0, corrected: 0, responses: 0, useful: 0,
    audited: 0, humanCorrected: 0, viewed: 0, originalRead: 0, balcao: 0, citizens: 0, newCitizens: 0,
    listen: 0, libras: 0, notifications: 0, latencyMedian: 0, latencyP95: 0, cost: 0, costTotal: 0,
  };
  let weight = 0;
  for (const p of points) {
    for (const key of sumKeys) total[key] += p[key];
    total.latencyMedian += p.latencyMedian * p.explained;
    total.latencyP95 += p.latencyP95 * p.explained;
    total.cost += p.cost * p.explained;
    total.costTotal += p.cost * p.explained;
    weight += p.explained;
  }
  if (weight > 0) {
    total.latencyMedian /= weight;
    total.latencyP95 /= weight;
    total.cost /= weight;
  }
  return total;
}

const ratio = (a: number, b: number) => (b > 0 ? a / b : 0);

type Day = Totals & { date: string; label: string };

const combinedCache = new Map<string, Day[]>();

/** Soma, dia a dia, as séries dos ramos escolhidos (guardada em cache: os dados são fixos). */
function combined(selected: Branch[]): Day[] {
  const key = selected.join(",");
  const cached = combinedCache.get(key);
  if (cached) return cached;
  const result = Array.from({ length: DAYS }, (_, d) => {
    const points: DailyPoint[] = selected.map((b) => dailyByBranch[b][d]);
    return { date: points[0].date, label: points[0].label, ...aggregate(points) };
  });
  combinedCache.set(key, result);
  return result;
}

/** Pesos de cada hora do dia (mais decisões em horário comercial); soma 1. */
const HOUR_WEIGHTS = (() => {
  const raw = Array.from({ length: 24 }, (_, h) => (h < 6 ? 0.01 : h < 8 ? 0.04 : h < 18 ? 0.085 : h < 22 ? 0.04 : 0.015));
  const sum = raw.reduce((a, b) => a + b, 0);
  return raw.map((w) => w / sum);
})();

export type Granularity = "hora" | "dia" | "semana";

interface EvolutionSeries {
  labels: string[];
  explanations: number[];
  understood: number[];
  notUnderstood: number[];
}

const tenth = (value: number) => Math.round(value * 1000) / 10;

/** Evolução no tempo: por hora (um dia só), por dia (até 45 dias) ou por semana (períodos longos). */
function buildEvolution(days: Day[]): { granularity: Granularity; series: EvolutionSeries } {
  if (days.length === 1) {
    const day = days[0];
    const understood = ratio(day.useful, day.explained);
    const notUnderstood = ratio(day.responses - day.useful, day.explained);
    return {
      granularity: "hora",
      series: {
        labels: HOUR_WEIGHTS.map((_, h) => `${String(h).padStart(2, "0")}h`),
        explanations: HOUR_WEIGHTS.map((w) => Math.round(day.explained * w)),
        understood: HOUR_WEIGHTS.map((_, h) => tenth(understood * (1 + 0.06 * Math.sin(h * 0.9)))),
        notUnderstood: HOUR_WEIGHTS.map((_, h) => tenth(notUnderstood * (1 + 0.1 * Math.cos(h * 0.7)))),
      },
    };
  }
  const size = days.length <= 45 ? 1 : 7;
  const labels: string[] = [];
  const explanations: number[] = [];
  const understood: number[] = [];
  const notUnderstood: number[] = [];
  for (let i = 0; i < days.length; i += size) {
    const group = aggregate(days.slice(i, i + size));
    labels.push(days[i].label);
    explanations.push(group.explained);
    understood.push(tenth(ratio(group.useful, group.explained)));
    notUnderstood.push(tenth(ratio(group.responses - group.useful, group.explained)));
  }
  return { granularity: size === 1 ? "dia" : "semana", series: { labels, explanations, understood, notUnderstood } };
}

export interface Kpi {
  value: number;
  previous: number;
}

export interface TypeUnderstanding {
  id: string;
  label: string;
  /** Fração das explicações em que o cidadão marcou "entendi". */
  value: number;
  /** Mesma medida entre quem avaliou (usada nas sugestões). */
  amongRaters: number;
  share: number;
}

export interface Suggestion {
  id: string;
  tone: "alerta" | "ok" | "info";
  title: string;
  text: string;
}

export interface Dashboard {
  /** Texto do período escolhido ('13/11/2026' ou '07/11/2026 a 13/11/2026'). */
  windowLabel: string;
  /** Quantos dias tem o período e se existe um período anterior para comparar. */
  days: number;
  hasPrevious: boolean;
  granularity: Granularity;
  kpis: {
    explanations: Kpi;
    /** % das explicações em que o cidadão marcou "entendi". */
    understood: Kpi & { amongRaters: number };
    original: Kpi;
    /** "Não entendi" da IA: decisões que ela preferiu não explicar. */
    notUnderstoodAI: Kpi;
    balcao: Kpi;
  };
  series: EvolutionSeries;
  funnel: {
    received: number;
    interpreted: number;
    viewed: number;
    notUnderstoodAI: number;
    notUnderstoodCitizen: number;
    humanReview: number;
  };
  usage: { citizens: number; newShare: number; listen: number; libras: number; notifications: number; responseRate: number; coverage: number };
  types: TypeUnderstanding[];
  quality: {
    corrected: number;
    correctedRate: number;
    humanCorrected: number;
    audited: number;
    latencyMedian: number;
    latencyP95: number;
    cost: number;
    costTotal: number;
    costTotalPrevious: number;
  };
  suggestions: Suggestion[];
}

export function getDashboard({ period, branch, range = defaultRange() }: { period: Period; branch: BranchFilter; range?: DateRange }): Dashboard {
  const selected = branch === "todos" ? branches : [branch];
  const all = combined(selected);
  const { from, to } = resolveWindow(period, range);
  const length = to - from + 1;
  const currentDays = all.slice(from, to + 1);
  const hasPrevious = from - length >= 0;
  const now = aggregate(currentDays);
  const prev = hasPrevious ? aggregate(all.slice(from - length, from)) : aggregate([]);
  const { granularity, series } = buildEvolution(currentDays);

  // As tendências mudam devagar: períodos mais antigos têm compreensão um pouco menor.
  const weeksAgo = (DAYS - 1 - (from + to) / 2) / 7;
  const trendShift = -0.0008 * weeksAgo;
  const branchDelta = branch === "todos" ? 0 : branchTypeDelta[branch];
  const types: TypeUnderstanding[] = decisionTypes
    .map((t) => {
      const amongRaters = Math.min(0.97, Math.max(0.4, t.base + branchDelta + trendShift));
      return { id: t.id, label: t.label, share: t.share, amongRaters, value: amongRaters * RESPONSE_RATE };
    })
    .sort((a, b) => b.value - a.value);

  const dashboard: Dashboard = {
    windowLabel: length === 1 ? formatDay(currentDays[0].date) : `${formatDay(currentDays[0].date)} a ${formatDay(currentDays[length - 1].date)}`,
    days: length,
    hasPrevious,
    granularity,
    kpis: {
      explanations: { value: now.explained, previous: prev.explained },
      understood: {
        value: ratio(now.useful, now.explained),
        previous: ratio(prev.useful, prev.explained),
        amongRaters: ratio(now.useful, now.responses),
      },
      original: { value: ratio(now.originalRead, now.explained), previous: ratio(prev.originalRead, prev.explained) },
      notUnderstoodAI: { value: ratio(now.notUnderstood, now.received), previous: ratio(prev.notUnderstood, prev.received) },
      balcao: { value: ratio(now.balcao, now.explained), previous: ratio(prev.balcao, prev.explained) },
    },
    series,
    funnel: {
      received: now.received,
      interpreted: now.received - now.notUnderstood,
      viewed: now.viewed,
      notUnderstoodAI: now.notUnderstood,
      notUnderstoodCitizen: now.responses - now.useful,
      humanReview: now.humanReview,
    },
    usage: {
      citizens: now.citizens,
      newShare: ratio(now.newCitizens, now.citizens),
      listen: ratio(now.listen, now.citizens),
      libras: ratio(now.libras, now.citizens),
      notifications: ratio(now.notifications, now.citizens),
      responseRate: ratio(now.responses, now.explained),
      coverage: ratio(now.explained, now.received),
    },
    types,
    quality: {
      corrected: now.corrected,
      correctedRate: ratio(now.corrected, now.explained),
      humanCorrected: now.humanCorrected,
      audited: now.audited,
      latencyMedian: now.latencyMedian,
      latencyP95: now.latencyP95,
      cost: now.cost,
      costTotal: now.costTotal,
      costTotalPrevious: prev.costTotal,
    },
    suggestions: [],
  };
  dashboard.suggestions = buildSuggestions(dashboard);
  return dashboard;
}

const pct = (value: number) => `${(value * 100).toFixed(1).replace(".", ",")}%`;
const pct0 = (value: number) => `${Math.round(value * 100)}%`;

/** Sugestões geradas por regra a partir dos números (sem IA: só leitura dos indicadores). */
export function buildSuggestions(d: Dashboard): Suggestion[] {
  const out: Suggestion[] = [];

  const worst = [...d.types].sort((a, b) => a.amongRaters - b.amongRaters)[0];
  if (worst && worst.amongRaters < TARGETS.comprehension) {
    out.push({
      id: "tipo",
      tone: "alerta",
      title: `Menor compreensão: ${worst.label}`,
      text: `Entre quem avaliou, só ${pct0(worst.amongRaters)} entendeu. Recomenda-se incluir, no fim da explicação, um quadro-resumo com “o que foi aceito e o que foi negado”, e revisar o roteiro desse tipo de decisão.`,
    });
  }

  const ai = d.kpis.notUnderstoodAI.value;
  out.push(
    Math.round(ai * 1000) / 1000 > TARGETS.notUnderstood
      ? {
          id: "naoentendi",
          tone: "alerta",
          title: `"Não entendi" da IA em ${pct(ai)} das decisões`,
          text: `Acima do limite de ${pct0(TARGETS.notUnderstood)}. Verifique a qualidade da digitalização dos documentos e os modelos de decisão que mais geram dúvida.`,
        }
      : {
          id: "naoentendi",
          tone: "info",
          title: "O sistema está reconhecendo seus limites",
          text: `${pct(ai)} das decisões foram encaminhadas como "não entendi" pela IA. Isso é desejável: é melhor não explicar do que explicar errado.`,
        },
  );

  out.push({
    id: "resposta",
    tone: "info",
    title: `Só ${pct0(d.usage.responseRate)} das explicações recebem avaliação`,
    text: "A maioria dos cidadãos não clica nos botões. Considere dar mais destaque a “Essa explicação foi útil?” e acompanhar também quem lê o documento original.",
  });

  return out;
}
