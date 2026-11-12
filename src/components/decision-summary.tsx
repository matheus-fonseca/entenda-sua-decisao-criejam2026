import { FileSearch, Scale, type LucideIcon } from "lucide-react";
import { decisionLabel } from "@/lib/processes";
import type { Decision, DecisionOutcome } from "@/lib/types";
import { cn } from "@/lib/utils";

const tones: Record<
  DecisionOutcome,
  { card: string; iconWrap: string; divider: string; label: string; icon: LucideIcon }
> = {
  // Pedido negado: cinza neutro (sem vermelho).
  negado: {
    card: "bg-neutral-soft border-neutral-border",
    iconWrap: "bg-white text-navy ring-neutral-border",
    divider: "bg-slate-400/60",
    label: "Resultado: pedido não aceito",
    icon: Scale,
  },
  // Parcialmente aceito: verde suave.
  parcial: {
    card: "bg-success-soft border-success-border",
    iconWrap: "bg-white text-success-strong ring-success-border",
    divider: "bg-success/40",
    label: "Resultado: pedido aceito em parte",
    icon: Scale,
  },
  // Interpretação insegura: âmbar suave.
  inseguro: {
    card: "bg-warn-soft border-warn-border",
    iconWrap: "bg-white text-warn ring-warn-border",
    divider: "bg-warn/40",
    label: "Interpretação indisponível",
    icon: FileSearch,
  },
};

export function DecisionSummary({ decision, isLatest }: { decision: Decision; isLatest: boolean }) {
  const tone = tones[decision.outcome];
  const Icon = tone.icon;

  return (
    <section
      aria-labelledby="resultado-decisao"
      className={cn(
        "flex flex-col gap-4 rounded-2xl border px-5 py-5 shadow-xs sm:flex-row sm:items-center sm:gap-6 sm:px-7 sm:py-6",
        tone.card,
      )}
    >
      <span
        className={cn(
          "flex size-14 shrink-0 items-center justify-center rounded-full ring-1 sm:size-[4.5rem]",
          tone.iconWrap,
        )}
      >
        <Icon className="size-7 sm:size-9" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <span aria-hidden="true" className={cn("hidden w-px self-stretch sm:block", tone.divider)} />
      <div className="min-w-0">
        <p className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[0.68rem] tracking-normal normal-case ring-1",
              isLatest ? "bg-white text-brand-strong ring-brand/30" : "bg-white/70 text-muted-foreground ring-border",
            )}
          >
            {isLatest ? "Decisão mais recente" : "Decisão anterior"}
          </span>
          <span>
            {tone.label} · {decisionLabel(decision)} de {decision.date}
          </span>
        </p>
        <h2
          id="resultado-decisao"
          className="font-heading text-[1.45rem] leading-tight font-bold text-foreground sm:text-[1.75rem]"
        >
          {decision.headline}
        </h2>
        <p className="mt-1.5 text-[1.02rem] leading-relaxed text-foreground/85 sm:text-[1.08rem]">
          {decision.subheadline}
        </p>
      </div>
    </section>
  );
}
