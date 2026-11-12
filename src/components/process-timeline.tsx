import Link from "next/link";
import { Check, FileText, Info, MousePointerClick } from "lucide-react";
import { MobileDisclosure } from "@/components/mobile-disclosure";
import { decisionHref } from "@/lib/processes";
import type { EventStatus, Process, ProcessEvent } from "@/lib/types";
import { cn } from "@/lib/utils";

const statusText: Record<EventStatus, string> = {
  concluido: "Etapa concluída",
  atual: "Etapa atual",
  futuro: "Possível etapa futura",
};

function Marker({ status, selected }: { status: EventStatus; selected: boolean }) {
  const selectedRing = selected && "outline-2 outline-offset-[3px] outline-brand outline-solid";

  if (status === "concluido") {
    return (
      <span
        className={cn(
          "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-success text-white shadow-sm ring-4 ring-white",
          selectedRing,
        )}
      >
        <Check className="size-4.5" strokeWidth={3} aria-hidden="true" />
      </span>
    );
  }
  if (status === "atual") {
    return (
      <span className={cn("relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-white ring-4 ring-white", selectedRing)}>
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
    "absolute left-[15px] top-8 h-[calc(100%-2rem)] xl:left-1/2 xl:top-[15px] xl:h-0 xl:w-full";
  if (next.status === "futuro") {
    return (
      <span
        aria-hidden="true"
        className={cn(base, "w-0 border-l-2 border-dashed border-slate-300 xl:border-t-2 xl:border-l-0")}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={cn(
        base,
        "w-[3px] xl:h-[3px]",
        next.status === "atual" ? "bg-gradient-to-b from-success to-brand xl:bg-gradient-to-r" : "bg-success",
      )}
    />
  );
}

function EventText({ event, isDecision, selected }: { event: ProcessEvent; isDecision: boolean; selected: boolean }) {
  const isCurrent = event.status === "atual";
  return (
    <div
      className={cn(
        "min-w-0 rounded-lg pt-1 xl:px-1.5 xl:pt-0",
        isDecision && "-mx-1.5 px-1.5 pb-1.5 transition-colors xl:mx-0 xl:py-1",
        isDecision && !selected && "group-hover:bg-brand-softer",
        selected && "bg-brand-soft ring-1 ring-brand/30",
      )}
    >
      <span className="sr-only">{statusText[event.status]}: </span>
      <p
        className={cn(
          "text-[0.9rem] leading-tight [overflow-wrap:anywhere] hyphens-auto",
          isCurrent && "font-heading text-[1.02rem] font-bold text-brand",
          event.status === "concluido" && "font-medium text-foreground",
          event.status === "futuro" && "font-medium text-muted-foreground",
          isDecision && "text-brand-strong underline decoration-brand/40 decoration-dotted underline-offset-4 group-hover:decoration-solid",
        )}
      >
        {isDecision && <FileText className="mr-1 inline size-3.5 align-[-2px]" aria-hidden="true" />}
        {event.label}
        {event.note && <span className="block">({event.note})</span>}
      </p>
      {event.status !== "futuro" && <span className="sr-only">Nome técnico: {event.technicalName}. </span>}
      <p className={cn("mt-0.5 text-[0.8rem] tabular-nums", isCurrent ? "font-semibold text-foreground" : "text-muted-foreground")}>
        {event.date ?? (
          <>
            <span aria-hidden="true">—</span>
            <span className="sr-only">sem data definida</span>
          </>
        )}
      </p>
      {selected && (
        <p className="mt-1 text-[0.72rem] font-semibold text-brand-strong" aria-hidden="true">
          Explicação aberta
        </p>
      )}
      <p className="mt-1 text-[0.82rem] text-muted-foreground xl:sr-only">{event.description}</p>
      {isDecision && !selected && <span className="sr-only">. Abrir a explicação desta decisão.</span>}
    </div>
  );
}

const miniDot: Record<EventStatus, string> = {
  concluido: "bg-success",
  atual: "bg-brand ring-2 ring-brand/30",
  futuro: "border-[1.5px] border-dashed border-slate-400 bg-white",
};

/** Resumo do andamento no celular: mini barra decorativa + etapa atual. */
function MobileSummary({ events }: { events: ProcessEvent[] }) {
  const current =
    events.find((e) => e.status === "atual") ?? events.findLast((e) => e.status === "concluido") ?? events[0];

  return (
    <div className="flex flex-col gap-2 md:hidden">
      <div aria-hidden="true" className="flex items-center px-1">
        {events.map((event, index) => {
          const next = events[index + 1];
          return (
            <span key={event.id} className={cn("flex items-center", next && "flex-1")}>
              <span className={cn("size-3 shrink-0 rounded-full", miniDot[event.status])} />
              {next && (
                <span
                  className={cn(
                    "mx-0.5 flex-1",
                    next.status === "futuro" ? "border-t-2 border-dashed border-slate-300" : "h-0.5 bg-success",
                  )}
                />
              )}
            </span>
          );
        })}
      </div>
      <p className="text-[0.95rem] leading-snug text-foreground">
        <span className="text-muted-foreground">Etapa atual: </span>
        <strong className="font-semibold text-brand-strong">
          {current.label}
          {current.note && ` (${current.note})`}
        </strong>
        {current.date && <span className="tabular-nums text-muted-foreground"> · {current.date}</span>}
      </p>
    </div>
  );
}

interface ProcessTimelineProps {
  process: Process;
  /** Decisão cuja explicação está aberta na página. */
  selectedDecisionId: string;
}

export function ProcessTimeline({ process, selectedDecisionId }: ProcessTimelineProps) {
  const { events } = process;
  const hasDecisionLinks = events.some((e) => e.decisionId);

  return (
    <section aria-labelledby="andamento" className="flex flex-col gap-3">
      <h2 id="andamento" className="sr-only">
        Andamento do processo
      </h2>

      <MobileSummary events={events} />

      <MobileDisclosure
        openLabel={`Ver todas as etapas (${events.length})`}
        closeLabel="Ocultar etapas"
        contentClassName="flex flex-col gap-3"
      >
        <ol
          className="grid grid-cols-1 xl:[grid-template-columns:repeat(var(--steps),minmax(0,1fr))]"
          style={{ "--steps": events.length } as React.CSSProperties}
        >
          {events.map((event, index) => {
            const next = events[index + 1];
            const isDecision = Boolean(event.decisionId);
            const selected = event.decisionId === selectedDecisionId;
            const content = (
              <>
                <Marker status={event.status} selected={selected} />
                <EventText event={event} isDecision={isDecision} selected={selected} />
              </>
            );
            const layout = "relative flex gap-3 xl:flex-col xl:items-center xl:gap-2 xl:text-center";

            return (
              <li
                key={event.id}
                aria-current={event.status === "atual" ? "step" : undefined}
                className="relative pb-5 last:pb-0 xl:px-0.5 xl:pb-0"
              >
                {next && <Connector next={next} />}
                {isDecision && event.decisionId ? (
                  <Link
                    href={decisionHref(process, event.decisionId)}
                    aria-current={selected ? "page" : undefined}
                    title={`Nome técnico: ${event.technicalName}`}
                    className={cn(layout, "group rounded-lg")}
                  >
                    {content}
                  </Link>
                ) : (
                  // Etapas futuras não mostram dica com o nome técnico.
                  <div
                    title={event.status === "futuro" ? undefined : `Nome técnico: ${event.technicalName}`}
                    className={cn(layout, event.status !== "futuro" && "cursor-help")}
                  >
                    {content}
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        <div className="flex flex-col gap-1 text-xs text-muted-foreground xl:flex-row xl:justify-center xl:gap-5">
          {hasDecisionLinks && (
            <p className="flex items-center gap-1.5">
              <MousePointerClick className="size-3.5 shrink-0 text-brand" aria-hidden="true" />
              Toque em uma decisão do juiz ou do tribunal para ver a explicação dela.
            </p>
          )}
          <p className="flex items-center gap-1.5 pointer-coarse:hidden">
            <Info className="size-3.5 shrink-0 text-brand" aria-hidden="true" />
            Passe o mouse sobre uma etapa para ver o nome técnico.
          </p>
        </div>
      </MobileDisclosure>
    </section>
  );
}
