"use client";

import { Check, ThumbsDown, ThumbsUp, type LucideIcon } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { cn } from "@/lib/utils";

type Vote = "sim" | "nao";

const options: { value: Vote; label: string; icon: LucideIcon }[] = [
  { value: "sim", label: "Sim", icon: ThumbsUp },
  { value: "nao", label: "Não", icon: ThumbsDown },
];

/** Avaliação leve: voto salvo apenas no navegador (localStorage), para demonstração. */
export function FeedbackWidget({ processId }: { processId: string }) {
  const [stored, setStored] = useLocalStorage(`entenda:feedback:${processId}`);
  const vote: Vote | null = stored === "sim" || stored === "nao" ? stored : null;

  return (
    <div className="flex flex-col items-center gap-2 py-1" role="group" aria-labelledby={`feedback-${processId}`}>
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
        <span id={`feedback-${processId}`} className="text-sm font-medium text-foreground">
          Essa explicação foi útil?
        </span>
        <div className="flex gap-2">
          {options.map(({ value, label, icon: Icon }) => {
            const selected = vote === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={selected}
                onClick={() => setStored(value)}
                className={cn(
                  "inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-sm font-medium transition-all duration-150",
                  selected
                    ? "border-brand bg-brand-soft text-brand-strong"
                    : "border-border bg-white text-foreground/80 hover:border-brand/40 hover:text-brand-strong",
                )}
              >
                <Icon className={cn("size-4", selected && "fill-brand/15")} aria-hidden="true" />
                {label}
              </button>
            );
          })}
        </div>
      </div>
      <p role="status" aria-live="polite" className="min-h-5 text-center text-xs text-muted-foreground">
        {vote && (
          <span className="inline-flex flex-wrap items-center justify-center gap-1">
            <Check className="size-3.5 text-success" aria-hidden="true" />
            Obrigado! Sua resposta foi registrada neste navegador (demonstração). Você pode alterá-la.
            <button
              type="button"
              onClick={() => setStored(null)}
              className="rounded font-medium text-brand underline underline-offset-2 hover:text-brand-strong"
            >
              Desfazer
            </button>
          </span>
        )}
      </p>
    </div>
  );
}
