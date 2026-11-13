"use client";

import { useEffect, useRef } from "react";
import { BarChart, FunnelChart, LineChart } from "echarts/charts";
import {
  AriaComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  TooltipComponent,
} from "echarts/components";
import * as echarts from "echarts/core";
import { SVGRenderer } from "echarts/renderers";
import type { EChartsCoreOption } from "echarts/core";

// Registra só o que o painel usa, para o ECharts não pesar nas outras rotas.
echarts.use([BarChart, FunnelChart, LineChart, AriaComponent, GridComponent, LegendComponent, MarkLineComponent, TooltipComponent, SVGRenderer]);

/** Cores do tema lidas das variáveis CSS (sem hex solto nos gráficos). */
export interface ChartPalette {
  brand: string;
  brandStrong: string;
  brandSoft: string;
  success: string;
  warn: string;
  text: string;
  muted: string;
  border: string;
  surface: string;
  font: string;
}

function readPalette(el: HTMLElement): ChartPalette {
  const style = getComputedStyle(el);
  const get = (name: string) => style.getPropertyValue(name).trim();
  return {
    brand: get("--brand"),
    brandStrong: get("--brand-strong"),
    brandSoft: get("--brand-soft"),
    success: get("--success"),
    warn: get("--warn"),
    text: get("--foreground"),
    muted: get("--muted-foreground"),
    border: get("--border"),
    surface: get("--surface"),
    font: style.fontFamily,
  };
}

interface EChartProps {
  /** Monta as opções do gráfico a partir da paleta do tema. */
  buildOption: (palette: ChartPalette) => EChartsCoreOption;
  /** Descrição curta lida por leitores de tela (a tabela de dados traz o detalhe). */
  label: string;
  height?: number;
}

/** Gráfico ECharts responsivo, em SVG, com animação desligada quando o usuário pede menos movimento. */
export function EChart({ buildOption, label, height = 260 }: EChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);
  const builderRef = useRef(buildOption);

  useEffect(() => {
    builderRef.current = buildOption;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chart = echarts.init(el, undefined, { renderer: "svg" });
    chartRef.current = chart;
    const observer = new ResizeObserver(() => chart.resize());
    observer.observe(el);
    return () => {
      observer.disconnect();
      chart.dispose();
      chartRef.current = null;
    };
  }, []);

  useEffect(() => {
    const chart = chartRef.current;
    const el = ref.current;
    if (!chart || !el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    chart.setOption(
      { animation: !reduceMotion, ...builderRef.current(readPalette(el)) },
      { notMerge: true },
    );
  });

  return <div ref={ref} role="img" aria-label={label} style={{ height }} className="w-full" />;
}
