import { FileSearch, Scale, Scale3d, type LucideIcon } from "lucide-react";
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
    icon: Scale3d,
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

export function DecisionSummary({ decision }: { decision: Decision }) {
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
        <p className="mb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          {tone.label} · {decision.documentType} de {decision.date}
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
