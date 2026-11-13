"use client";

import { ChartCard } from "@/components/dashboard/chart-card";
import {
  AccessibilityUsageChart,
  EvolutionChart,
  FunnelPipelineChart,
  TypeUnderstandingChart,
} from "@/components/dashboard/charts";
import { formatDecimal, formatMoney, formatNumber, formatPercent } from "@/components/dashboard/format";
import { KpiCard } from "@/components/dashboard/kpi-card";
import {
  DATE_LIMITS,
  type BranchFilter,
  type Dashboard,
  type DateRange,
  type Period,
  TARGETS,
  branchOptions,
  defaultRange,
  getDashboard,
  periodOptions,
} from "@/lib/metrics";
import { cn } from "@/lib/utils";
import { CircleAlert, CircleCheck, Info } from "lucide-react";
import { useId, useMemo, useState } from "react";

const selectClass =
  "h-11 w-full rounded-lg border border-border bg-white px-3 text-[0.95rem] font-medium text-foreground shadow-xs focus-visible:border-brand";

function Section({ id, title, subtitle, children }: { id: string; title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-3">
      <div>
        <h2 id={id} className="font-heading text-[1.4rem] leading-tight font-bold text-brand-strong">
          {title}
        </h2>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      {children}
    </section>
  );
}

/** Variação relativa (%) ou em pontos percentuais, com o sinal certo no texto. */
function relDelta(now: number, before: number, hasPrevious = true) {
  if (!hasPrevious || before === 0) return { text: "Sem comparação", direction: "flat" as const };
  const diff = (now - before) / before;
  if (Math.abs(diff) < 0.0005) return { text: "Estável", direction: "flat" as const };
  return { text: `${diff > 0 ? "+" : "−"}${formatDecimal(Math.abs(diff) * 100)}%`, direction: diff > 0 ? ("up" as const) : ("down" as const) };
}

function ppDelta(now: number, before: number, hasPrevious = true) {
  if (!hasPrevious) return { text: "Sem comparação", direction: "flat" as const };
  const diff = (now - before) * 100;
  if (Math.abs(diff) < 0.05) return { text: "Estável", direction: "flat" as const };
  return { text: `${diff > 0 ? "+" : "−"}${formatDecimal(Math.abs(diff))} p.p.`, direction: diff > 0 ? ("up" as const) : ("down" as const) };
}

function Kpis({ d }: { d: Dashboard }) {
  const k = d.kpis;
  const has = d.hasPrevious;
  const explanations = relDelta(k.explanations.value, k.explanations.previous, has);
  const understood = ppDelta(k.understood.value, k.understood.previous, has);
  const original = ppDelta(k.original.value, k.original.previous, has);
  const notUnderstood = ppDelta(k.notUnderstoodAI.value, k.notUnderstoodAI.previous, has);
  const balcao = ppDelta(k.balcao.value, k.balcao.previous, has);

  return (
    <ul aria-label="Indicadores principais" className="grid grid-cols-2 gap-3 lg:grid-cols-5">
      <li className="col-span-2 sm:col-span-1">
        <KpiCard label="Explicações geradas" value={formatNumber(k.explanations.value)} deltaText={explanations.text} direction={explanations.direction} goodWhen="up" />
      </li>
      <li>
        <KpiCard
          label="Cidadãos que entenderam"
          value={formatPercent(k.understood.value)}
          deltaText={understood.text}
          direction={understood.direction}
          goodWhen="up"
          hint={`Das explicações. Entre quem avaliou (${formatPercent(d.usage.responseRate, 0)}), ${formatPercent(k.understood.amongRaters, 0)} entendeu.`}
        />
      </li>
      <li>
        <KpiCard
          label="Leu o documento original"
          value={formatPercent(k.original.value)}
          deltaText={original.text}
          direction={original.direction}
          goodWhen="up"
          neutral
          hint="Das explicações, quantas levaram a abrir “Ver decisão original”."
        />
      </li>
      <li>
        <KpiCard
          label="IA preferiu não explicar"
          value={formatPercent(k.notUnderstoodAI.value)}
          deltaText={notUnderstood.text}
          direction={notUnderstood.direction}
          goodWhen="down"
          target={{ text: `Limite: ${formatPercent(TARGETS.notUnderstood, 0)}`, met: Math.round(k.notUnderstoodAI.value * 1000) / 1000 <= TARGETS.notUnderstood }}
          hint="Decisões que a IA preferiu não explicar."
        />
      </li>
      <li>
        <KpiCard label="Encaminhadas ao Balcão" value={formatPercent(k.balcao.value)} deltaText={balcao.text} direction={balcao.direction} goodWhen="down" hint="Das explicações, quantas levaram a atendimento humano." />
      </li>
    </ul>
  );
}

const toneIcon = { alerta: CircleAlert, ok: CircleCheck, info: Info } as const;
const toneStyle = {
  alerta: "border-warn-border bg-warn-soft",
  ok: "border-success-border bg-success-soft",
  info: "border-border bg-brand-softer",
} as const;
const toneText = { alerta: "Atenção", ok: "Dentro da meta", info: "Informação" } as const;

export function DashboardView() {
  const [period, setPeriod] = useState<Period>("30d");
  const [branch, setBranch] = useState<BranchFilter>("todos");
  const [range, setRange] = useState<DateRange>(defaultRange);
  const periodId = useId();
  const branchId = useId();
  const startId = useId();
  const endId = useId();
  const d = useMemo(() => getDashboard({ period, branch, range }), [period, branch, range]);
  const swapped = period === "custom" && range.start > range.end;

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor={periodId} className="mb-1 block text-sm font-semibold">Período</label>
          <select id={periodId} value={period} onChange={(e) => setPeriod(e.target.value as Period)} className={selectClass}>
            {periodOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        {period === "custom" && (
          <>
            <div className="flex-1">
              <label htmlFor={startId} className="mb-1 block text-sm font-semibold">De</label>
              <input id={startId} type="date" min={DATE_LIMITS.min} max={DATE_LIMITS.max} value={range.start} onChange={(e) => e.target.value && setRange((r) => ({ ...r, start: e.target.value }))} className={selectClass} />
            </div>
            <div className="flex-1">
              <label htmlFor={endId} className="mb-1 block text-sm font-semibold">Até</label>
              <input id={endId} type="date" min={DATE_LIMITS.min} max={DATE_LIMITS.max} value={range.end} onChange={(e) => e.target.value && setRange((r) => ({ ...r, end: e.target.value }))} className={selectClass} />
            </div>
          </>
        )}
        <div className="flex-1">
          <label htmlFor={branchId} className="mb-1 block text-sm font-semibold">Ramo da Justiça</label>
          <select id={branchId} value={branch} onChange={(e) => setBranch(e.target.value as BranchFilter)} className={selectClass}>
            {branchOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>
      <p role="status" className="text-sm text-muted-foreground">
        Período: <strong className="text-foreground">{d.windowLabel}</strong> ({d.days} {d.days === 1 ? "dia" : "dias"})
        {" · "}
        {branchOptions.find((b) => b.value === branch)?.label}
        {swapped && " · as datas estavam invertidas e foram ordenadas"}
        {!d.hasPrevious && " · sem período anterior para comparar"}
      </p>

      <Kpis d={d} />

      <Section id="uso" title="Uso" subtitle="O serviço está chegando às pessoas?">
        <div className="grid gap-3 lg:grid-cols-3">
          <ChartCard
            className="lg:col-span-2"
            title={`Evolução por ${d.granularity}`}
            description="Explicações geradas e, sobre todas elas, quantas o cidadão marcou como entendi e não entendi."
            table={{ headers: [d.granularity === "hora" ? "Hora" : d.granularity === "dia" ? "Dia" : "Semana (início)", "Explicações", "% que entendeu", "% que não entendeu"], rows: d.series.labels.map((l, i) => [l, formatNumber(d.series.explanations[i]), `${formatDecimal(d.series.understood[i])}%`, `${formatDecimal(d.series.notUnderstood[i])}%`]) }}
          >
            <EvolutionChart data={d} />
          </ChartCard>
          <ChartCard
            title="Acessibilidade e avisos"
            description={`${formatNumber(d.usage.citizens)} cidadãos ativos; ${formatPercent(d.usage.newShare, 0)} novos.`}
            table={{ headers: ["Recurso", "% dos cidadãos"], rows: [["Avisos por WhatsApp/e-mail", formatPercent(d.usage.notifications, 0)], ["Ouvir explicação", formatPercent(d.usage.listen, 0)], ["Libras", formatPercent(d.usage.libras, 0)]] }}
          >
            <AccessibilityUsageChart data={d} />
            <p className="text-sm text-muted-foreground">
              Cobertura: <strong className="text-foreground">{formatPercent(d.usage.coverage, 0)}</strong> das decisões recebidas já têm explicação publicada.
            </p>
          </ChartCard>
        </div>
      </Section>

      <Section id="compreensao" title="Compreensão" subtitle="Em que tipos de decisão o cidadão mais tem dificuldade?">
        <ChartCard
          title="Cidadãos que entenderam, por tipo de decisão"
          description={`Sobre todas as explicações. Taxa de resposta à avaliação: ${formatPercent(d.usage.responseRate, 0)} das explicações.`}
          table={{ headers: ["Tipo de decisão", "% das explicações que entenderam", "% entre quem avaliou", "Participação no volume"], rows: d.types.map((t) => [t.label, formatPercent(t.value), formatPercent(t.amongRaters, 0), formatPercent(t.share, 0)]) }}
        >
          <TypeUnderstandingChart data={d} />
        </ChartCard>
      </Section>

      <Section id="qualidade" title="Qualidade da IA" subtitle="Dois agentes: o Simplificado escreve a explicação e o Revisor confere antes de publicar.">
        <ChartCard
          title="Do recebimento à visualização"
          description="O que acontece com as decisões recebidas."
          table={{
            headers: ["Etapa", "Decisões"],
            rows: [
              ["Recebidas", formatNumber(d.funnel.received)],
              ["Interpretadas", formatNumber(d.funnel.interpreted)],
              ["Visualizadas pelo cidadão", formatNumber(d.funnel.viewed)],
              ["Corrigidas pelo agente Revisor", formatNumber(d.quality.corrected)],
              ["IA preferiu não explicar", formatNumber(d.funnel.notUnderstoodAI)],
              ["“Não entendi” (cidadão)", formatNumber(d.funnel.notUnderstoodCitizen)],
              ["Revisão humana", formatNumber(d.funnel.humanReview)],
            ],
          }}
        >
          <div className="grid items-center gap-4 lg:grid-cols-[3fr_2fr]">
            <FunnelPipelineChart data={d} />
            <ul aria-label="Resultados do processamento" className="grid gap-2.5 sm:grid-cols-2">
              {[
                { label: "Corrigidas pelo agente Revisor", value: d.quality.corrected, hint: `${formatPercent(d.quality.correctedRate, 0)} das explicações, ajustadas antes de publicar` },
                { label: "IA preferiu não explicar", value: d.funnel.notUnderstoodAI, hint: "Decisões que a IA preferiu não explicar." },
                { label: "“Não entendi” (cidadão)", value: d.funnel.notUnderstoodCitizen, hint: "Marcado no botão da explicação" },
                { label: "Revisão humana", value: d.funnel.humanReview, hint: "Reprovadas pelo agente Revisor" },
              ].map((item) => (
                <li key={item.label} className="rounded-lg border border-border bg-brand-softer px-3.5 py-2.5">
                  <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                  <p className="font-heading text-[1.4rem] leading-tight font-bold tabular-nums">{formatNumber(item.value)}</p>
                  <p className="text-xs text-muted-foreground">{item.hint}</p>
                </li>
              ))}
            </ul>
          </div>
        </ChartCard>
        <ul aria-label="Correções, tempo e custo do processamento" className="grid grid-cols-2 gap-3 lg:grid-cols-5">
          {[
            {
              label: "Custo total de IA",
              value: formatMoney(d.quality.costTotal),
              hint: d.hasPrevious ? `${relDelta(d.quality.costTotal, d.quality.costTotalPrevious).text} vs. período anterior (${formatMoney(d.quality.costTotalPrevious)}). Valores simulados.` : "Valores simulados.",
              highlight: true,
            },
            { label: "Corrigidas por revisor humano", value: formatNumber(d.quality.humanCorrected), hint: `Após auditoria de ${formatNumber(d.quality.audited)} explicações por amostragem` },
            { label: "Tempo até a explicação", value: `${Math.round(d.quality.latencyMedian)} s`, hint: "Mediana, da publicação da decisão" },
            { label: "Casos mais lentos (p95)", value: `${Math.round(d.quality.latencyP95)} s`, hint: "95% das explicações saem antes disso" },
            { label: "Custo por explicação", value: formatMoney(d.quality.cost), hint: `Média de ${formatNumber(d.kpis.explanations.value)} explicações no período` },
          ].map((item) => (
            <li
              key={item.label}
              className={cn(
                "rounded-xl border p-4 shadow-xs",
                "highlight" in item && item.highlight ? "col-span-2 border-brand/40 bg-brand-softer lg:col-span-1" : "border-border bg-white",
              )}
            >
              <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
              <p className="font-heading mt-1 text-[1.5rem] leading-none font-bold tabular-nums">{item.value}</p>
              <p className="mt-1.5 text-xs text-muted-foreground">{item.hint}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="acoes" title="Ações" subtitle="O que fazer agora.">
        <ul className="grid gap-2.5 lg:grid-cols-3">
          {d.suggestions.map((s) => {
            const Icon = toneIcon[s.tone];
            return (
              <li key={s.id} className={cn("flex gap-3 rounded-xl border p-3.5", toneStyle[s.tone])}>
                <Icon className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-[0.95rem] font-semibold">
                    <span className="sr-only">{toneText[s.tone]}: </span>
                    {s.title}
                  </p>
                  <p className="mt-0.5 text-sm leading-snug text-foreground/85">{s.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Section>
    </div>
  );
}
