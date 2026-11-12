import { Check, Info } from "lucide-react";
import type { EventStatus, ProcessEvent } from "@/lib/types";
import { cn } from "@/lib/utils";

const statusText: Record<EventStatus, string> = {
  concluido: "Etapa concluída",
  atual: "Etapa atual",
  futuro: "Possível etapa futura",
};

function Marker({ status }: { status: EventStatus }) {
  if (status === "concluido") {
    return (
      <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-success text-white shadow-sm ring-4 ring-white">
        <Check className="size-4.5" strokeWidth={3} aria-hidden="true" />
      </span>
    );
  }
  if (status === "atual") {
    return (
      <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-white ring-4 ring-white">
        <span className="absolute inset-0 rounded-full bg-brand/25 motion-safe:animate-ping [animation-duration:2.4s]" aria-hidden="true" />
        <span className="relative flex size-8 items-center justify-center rounded-full border-[3px] border-brand bg-white">
          <span className="size-3.5 rounded-full bg-brand" />
        </span>
      </span>
    );
  }
  return (
    <span className="relative z-10 flex size-8 shrink-0 rounded-full border-2 border-dashed border-slate-400 bg-white ring-4 ring-white" />
  );
}

function Connector({ next }: { next: ProcessEvent }) {
  const base =
    "absolute left-[15px] top-8 h-[calc(100%-2rem)] md:left-1/2 md:top-[15px] md:h-0 md:w-full";
  if (next.status === "futuro") {
    return (
      <span
        aria-hidden="true"
        className={cn(base, "w-0 border-l-2 border-dashed border-slate-300 md:border-t-2 md:border-l-0")}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={cn(
        base,
        "w-[3px] md:h-[3px]",
        next.status === "atual"
          ? "bg-gradient-to-b from-success to-brand md:bg-gradient-to-r"
          : "bg-success",
      )}
    />
  );
}

interface ProcessTimelineProps {
  events: ProcessEvent[];
  currentSituation: string;
}

export function ProcessTimeline({ events, currentSituation }: ProcessTimelineProps) {
  return (
    <section aria-labelledby="andamento" className="flex flex-col gap-3">
      <h2 id="andamento" className="sr-only">
        Andamento do processo
      </h2>

      <ol
        className="grid grid-cols-1 md:[grid-template-columns:repeat(var(--steps),minmax(0,1fr))]"
        style={{ "--steps": events.length } as React.CSSProperties}
      >
        {events.map((event, index) => {
          const next = events[index + 1];
          const isCurrent = event.status === "atual";
          return (
            <li
              key={event.id}
              aria-current={isCurrent ? "step" : undefined}
              className="relative flex gap-3 pb-5 last:pb-0 md:flex-col md:items-center md:gap-2 md:px-1 md:pb-0 md:text-center"
            >
              {next && <Connector next={next} />}
              <Marker status={event.status} />
              <div className="min-w-0 pt-1 md:pt-0">
                <span className="sr-only">{statusText[event.status]}: </span>
                <p
                  className={cn(
                    "text-[0.92rem] leading-tight",
                    isCurrent && "font-heading text-[1.05rem] font-bold text-brand",
                    event.status === "concluido" && "font-medium text-foreground",
                    event.status === "futuro" && "font-medium text-muted-foreground",
                  )}
                >
                  {event.label}
                  {event.note && <span className="block">({event.note})</span>}
                </p>
                <p className={cn("mt-0.5 text-[0.82rem] tabular-nums", isCurrent ? "font-semibold text-foreground" : "text-muted-foreground")}>
                  {event.date ?? (
                    <>
                      <span aria-hidden="true">—</span>
                      <span className="sr-only">sem data definida</span>
                    </>
                  )}
                </p>
                {isCurrent && event.technicalName && (
                  <p className="mt-1 text-[0.75rem] text-muted-foreground">Nome técnico: {event.technicalName}</p>
                )}
                <p className="mt-1 text-[0.82rem] text-muted-foreground md:sr-only">{event.description}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <p className="flex items-center gap-1.5 text-xs text-muted-foreground md:justify-center">
        <span aria-hidden="true" className="inline-block w-5 border-t-2 border-dashed border-slate-300" />
        Etapas futuras são possibilidades: dependem do andamento do processo e podem não acontecer.
      </p>

      <div className="flex items-start gap-3 rounded-xl bg-brand-soft px-4 py-3 text-[0.95rem] text-foreground sm:items-center">
        <Info className="mt-0.5 size-5 shrink-0 text-brand sm:mt-0" aria-hidden="true" />
        <p>
          <strong className="font-heading text-[1.05rem] font-bold text-brand-strong">Agora:</strong>{" "}
          {currentSituation}
        </p>
      </div>
    </section>
  );
}
