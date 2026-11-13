"use client";

import { EChart, type ChartPalette } from "@/components/charts/echart";
import type { Dashboard } from "@/lib/metrics";
import { formatNumber } from "@/components/dashboard/format";

type Option = Record<string, unknown>;

const decimal = (value: number) => value.toFixed(1).replace(".", ",");

/** Textura diagonal: marca as barras "fora da meta" sem depender só da cor. */
const hatch = { symbol: "rect", dashArrayX: [1, 0], dashArrayY: [3, 4], rotation: Math.PI / 4, color: "rgba(255,255,255,0.55)" };

function base(p: ChartPalette): Option {
  return {
    textStyle: { fontFamily: p.font, fontSize: 12, color: p.text },
    aria: { enabled: true },
    tooltip: { trigger: "axis", confine: true, borderColor: p.border, textStyle: { fontSize: 13 } },
  };
}

export function EvolutionChart({ data }: { data: Dashboard }) {
  const dense = data.series.labels.length <= 14;
  return (
    <EChart
      label="Gráfico de linhas: explicações geradas por semana e porcentagem de explicações em que o cidadão marcou entendi e não entendi"
      height={290}
      buildOption={(p) => ({
        ...base(p),
        legend: { top: 0, textStyle: { color: p.text, fontSize: 12 } },
        grid: { top: 72, left: 8, right: 8, bottom: 8, containLabel: true },
        xAxis: { type: "category", data: data.series.labels, axisLabel: { color: p.muted, interval: "auto" }, axisLine: { lineStyle: { color: p.border } } },
        yAxis: [
          { type: "value", name: "Explicações", nameTextStyle: { color: p.muted, align: "left" }, axisLabel: { color: p.muted }, splitLine: { lineStyle: { color: p.border } } },
          { type: "value", name: "% das explicações", nameTextStyle: { color: p.muted, align: "right" }, min: 0, max: 25, axisLabel: { color: p.muted, formatter: "{value}%" }, splitLine: { show: false } },
        ],
        series: [
          { name: "Explicações geradas", type: "line", smooth: true, symbol: "circle", symbolSize: 6, showSymbol: dense, lineStyle: { width: 3, color: p.brand }, itemStyle: { color: p.brand }, areaStyle: { color: p.brandSoft }, data: data.series.explanations },
          { name: "% que entendeu", type: "line", yAxisIndex: 1, smooth: true, symbol: "diamond", symbolSize: 7, showSymbol: dense, lineStyle: { width: 3, type: "dashed", color: p.success }, itemStyle: { color: p.success }, data: data.series.understood },
          { name: "% que não entendeu", type: "line", yAxisIndex: 1, smooth: true, symbol: "triangle", symbolSize: 7, showSymbol: dense, lineStyle: { width: 3, type: "dotted", color: p.warn }, itemStyle: { color: p.warn }, data: data.series.notUnderstood },
        ],
      })}
    />
  );
}

export function TypeUnderstandingChart({ data }: { data: Dashboard }) {
  const rows = [...data.types].reverse();
  const lowest = data.types[data.types.length - 1];
  return (
    <EChart
      label="Gráfico de barras: porcentagem das explicações em que o cidadão marcou entendi, por tipo de decisão"
      height={240}
      buildOption={(p) => ({
        ...base(p),
        tooltip: { trigger: "item", confine: true, formatter: (x: { name: string; value: number }) => `${x.name}: ${decimal(x.value)}%` },
        grid: { top: 8, left: 8, right: 56, bottom: 8, containLabel: true },
        xAxis: { type: "value", min: 0, max: 20, show: false },
        yAxis: { type: "category", data: rows.map((r) => r.label), axisLabel: { color: p.text, width: 150, overflow: "break", fontSize: 12 }, axisLine: { show: false }, axisTick: { show: false } },
        series: [
          {
            type: "bar",
            barWidth: 18,
            label: { show: true, position: "right", formatter: (x: { value: number }) => `${decimal(x.value)}%`, color: p.text, fontWeight: 700 },
            data: rows.map((r) => {
              const value = Math.round(r.value * 1000) / 10;
              const below = r === lowest;
              return { value, itemStyle: { color: below ? p.warn : p.brand, decal: below ? hatch : undefined, borderRadius: [0, 4, 4, 0] } };
            }),
          },
        ],
      })}
    />
  );
}

export function FunnelPipelineChart({ data }: { data: Dashboard }) {
  const f = data.funnel;
  return (
    <EChart
      label="Funil: decisões recebidas, interpretadas e visualizadas pelo cidadão"
      height={230}
      buildOption={(p) => ({
        ...base(p),
        tooltip: { trigger: "item", confine: true, formatter: (x: { name: string; value: number }) => `${x.name}: ${formatNumber(x.value)}` },
        series: [
          {
            type: "funnel",
            left: "4%",
            right: "4%",
            top: 8,
            bottom: 8,
            minSize: "55%",
            gap: 3,
            sort: "descending",
            label: { show: true, position: "inside", color: p.surface, fontWeight: 700, fontSize: 13, formatter: (x: { name: string; value: number }) => `${x.name}\n${formatNumber(x.value)}` },
            itemStyle: { borderWidth: 0 },
            data: [
              { name: "Recebidas", value: f.received, itemStyle: { color: p.brandStrong } },
              { name: "Interpretadas", value: f.interpreted, itemStyle: { color: p.brand } },
              { name: "Visualizadas pelo cidadão", value: f.viewed, itemStyle: { color: p.success } },
            ],
          },
        ],
      })}
    />
  );
}

export function AccessibilityUsageChart({ data }: { data: Dashboard }) {
  const rows = [
    { name: "Avisos por WhatsApp/e-mail", value: data.usage.notifications },
    { name: "Ouvir explicação", value: data.usage.listen },
    { name: "Libras", value: data.usage.libras },
  ].reverse();
  return (
    <EChart
      label="Gráfico de barras: porcentagem de cidadãos que usam avisos, áudio e Libras"
      height={190}
      buildOption={(p) => ({
        ...base(p),
        tooltip: { trigger: "item", confine: true, formatter: "{b}: {c}%" },
        grid: { top: 4, left: 8, right: 48, bottom: 4, containLabel: true },
        xAxis: { type: "value", min: 0, max: 100, show: false },
        yAxis: { type: "category", data: rows.map((r) => r.name), axisLabel: { color: p.text, fontSize: 12, width: 120, overflow: "break" }, axisLine: { show: false }, axisTick: { show: false } },
        series: [
          {
            type: "bar",
            barWidth: 16,
            label: { show: true, position: "right", formatter: "{c}%", color: p.text, fontWeight: 700 },
            itemStyle: { color: p.brand, borderRadius: [0, 4, 4, 0] },
            showBackground: true,
            backgroundStyle: { color: p.brandSoft, borderRadius: [0, 4, 4, 0] },
            data: rows.map((r) => Math.round(r.value * 100)),
          },
        ],
      })}
    />
  );
}
