import { ArrowDown, ArrowUp, CircleAlert, CircleCheck, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: string;
  /** Variação em relação ao período anterior, já formatada ("+8,2%", "−0,4 p.p."). */
  deltaText: string;
  /** Sentido da variação (positivo = subiu) e se subir é bom ou ruim. */
  direction: "up" | "down" | "flat";
  goodWhen: "up" | "down";
  /** Sem juízo de valor (a variação aparece sem cor de melhora ou piora). */
  neutral?: boolean;
  /** Linha de meta opcional. */
  target?: { text: string; met: boolean };
  hint?: string;
}

/** Indicador principal: valor, variação (seta + texto) e meta (ícone + texto), nunca só cor. */
export function KpiCard({ label, value, deltaText, direction, goodWhen, neutral, target, hint }: KpiCardProps) {
  const good = direction === "flat" || neutral ? null : direction === goodWhen;
  const Arrow = direction === "up" ? ArrowUp : direction === "down" ? ArrowDown : Minus;

  return (
    <article className="flex h-full flex-col gap-1.5 rounded-xl border border-border bg-white p-4 shadow-xs">
      <h3 className="text-sm font-medium text-muted-foreground">{label}</h3>
      <p className="font-heading text-[1.9rem] leading-none font-bold tabular-nums text-foreground">{value}</p>
      <div>
        <p
          className={cn(
            "flex items-center gap-1 text-sm font-semibold",
            good === null ? "text-muted-foreground" : good ? "text-success-strong" : "text-warn",
          )}
        >
          <Arrow className="size-4 shrink-0" aria-hidden="true" />
          <span>{deltaText}</span>
          <span className="sr-only">{direction === "flat" ? ", sem mudança" : good === null ? (direction === "up" ? ", subiu" : ", caiu") : good ? ", melhorou" : ", piorou"}</span>
        </p>
        <p className="text-xs text-muted-foreground">em relação ao período anterior</p>
      </div>
      {target && (
        <p className={cn("flex items-center gap-1 text-sm", target.met ? "text-success-strong" : "text-warn")}>
          {target.met ? <CircleCheck className="size-4 shrink-0" aria-hidden="true" /> : <CircleAlert className="size-4 shrink-0" aria-hidden="true" />}
          <span>{target.text}</span>
          <span className="sr-only">{target.met ? ": dentro da meta" : ": fora da meta"}</span>
        </p>
      )}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </article>
  );
}
