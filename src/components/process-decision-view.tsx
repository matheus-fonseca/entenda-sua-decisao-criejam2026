import { AccessibilityControls } from "@/components/accessibility-controls";
import { DecisionSummary } from "@/components/decision-summary";
import { ExplanationSection, SentenceList, type ExplanationItem } from "@/components/explanation-section";
import { FeedbackWidget } from "@/components/feedback-widget";
import { HumanSupportModal } from "@/components/human-support-modal";
import { NewerDecisionNotice } from "@/components/newer-decision-notice";
import { ProcessMetadata } from "@/components/process-metadata";
import { ProcessTimeline } from "@/components/process-timeline";
import { PrototypeBadge } from "@/components/prototype-badge";
import {
  buildSpokenExplanation,
  decisionHref,
  getLatestDecision,
  nextSectionTitle,
  originalDocumentHref,
} from "@/lib/processes";
import type { Decision, Process } from "@/lib/types";
import { ArrowLeft, CalendarClock, FileText, FileWarning, Gavel, History, Info, LifeBuoy } from "lucide-react";
import Link from "next/link";

const linkStyle =
  "inline-flex items-center gap-2 rounded-md text-[0.95rem] font-semibold text-brand underline underline-offset-4 decoration-brand/40 transition-colors hover:text-brand-strong hover:decoration-brand";

function buildSections(process: Process, decision: Decision, isLatest: boolean): ExplanationItem[] {
  if (!decision.explanation) {
    // Cenário inseguro: nenhuma síntese do resultado é exibida.
    return [
      {
        id: "por-que-sem-explicacao",
        title: "Por que não há uma explicação?",
        icon: FileWarning,
        content: <SentenceList sentences={decision.uncertaintyReasons ?? []} />,
      },
      {
        id: "o-que-fazer",
        title: "Onde encontrar a informação?",
        icon: LifeBuoy,
        content: (
          <div className="flex flex-col gap-3">
            <p>Recomendamos consultar a decisão completa e, se precisar, pedir ajuda a uma pessoa.</p>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <Link
                href={originalDocumentHref(process, decision.id)}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-strong"
              >
                <FileText className="size-4.5" aria-hidden="true" />
                Ler a decisão original
              </Link>
              <HumanSupportModal
                processNumber={process.number}
                court={process.court}
                triggerClassName="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-brand/40 bg-white px-4 text-sm font-semibold text-brand-strong transition-colors hover:border-brand"
                triggerLabel={
                  <>
                    <LifeBuoy className="size-4.5" aria-hidden="true" />
                    Falar com o Balcão Virtual
                  </>
                }
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Quem representa você no processo, como advogado ou Defensoria Pública, também pode explicar a decisão.
            </p>
          </div>
        ),
      },
    ];
  }

  return [
    {
      id: "por-que",
      title: `Por que ${decision.decidedBy} decidiu assim?`,
      icon: FileText,
      content: <SentenceList sentences={decision.explanation.why} />,
    },
    {
      id: "o-que-pode-acontecer",
      title: nextSectionTitle(isLatest),
      icon: isLatest ? CalendarClock : History,
      content: <SentenceList sentences={decision.explanation.whatNext} />,
    },
  ];
}

interface ProcessDecisionViewProps {
  process: Process;
  decision: Decision;
}

/** Tela "Entenda a decisão" para uma decisão específica do processo. */
export function ProcessDecisionView({ process, decision }: ProcessDecisionViewProps) {
  const latest = getLatestDecision(process);
  const isLatest = latest.id === decision.id;
  // Chaves únicas por componente: reiniciam o estado ao trocar de decisão
  // sem colidir entre irmãos (chaves repetidas duplicavam as seções).
  const viewKey = `${process.id}-${decision.id}`;

  return (
    <main id="conteudo" className="flex-1">
      <div className="mx-auto flex w-full max-w-[68rem] flex-col gap-5 px-4 py-5 sm:px-8 sm:py-7">
        <div>
          <Link href="/processos" className={`${linkStyle} no-underline hover:underline`}>
            <ArrowLeft className="size-4" aria-hidden="true" />
            Voltar
          </Link>
          <div className="mt-3 flex items-center gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white text-brand shadow-md ring-1 shadow-navy/10 ring-border sm:size-14">
              <Gavel className="size-6 sm:size-7" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h1 className="font-heading text-[1.65rem] leading-tight font-bold text-brand-strong sm:text-[2rem]">
                Entenda a decisão
              </h1>
              <p className="text-[0.98rem] text-foreground/80">
                Veja o que {decision.decidedBy} decidiu, sem palavras difíceis.
              </p>
            </div>
          </div>
        </div>

        <ProcessMetadata process={process} decision={decision} />

        <ProcessTimeline process={process} selectedDecisionId={decision.id} />

        {!isLatest && <NewerDecisionNotice latest={latest} href={decisionHref(process, latest.id)} />}

        <DecisionSummary decision={decision} isLatest={isLatest} />

        <ExplanationSection key={`${viewKey}-explicacao`} items={buildSections(process, decision, isLatest)} />

        <AccessibilityControls key={`${viewKey}-audio`} text={buildSpokenExplanation(process, decision)} />

        <div className="border-t border-border pt-4">
          <FeedbackWidget key={`${viewKey}-avaliacao`} feedbackId={viewKey} />
        </div>

        <nav aria-label="Apoio" className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
          <HumanSupportModal processNumber={process.number} court={process.court} triggerClassName={linkStyle} />
          <span aria-hidden="true" className="hidden h-6 w-px bg-border sm:block" />
          <Link href={originalDocumentHref(process, decision.id)} className={linkStyle}>
            <FileText className="size-5" aria-hidden="true" />
            Ver decisão original
          </Link>
        </nav>

        <footer className="flex flex-col items-start gap-3 border-t border-border pt-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2">
            <Info className="size-4.5 shrink-0" aria-hidden="true" />
            Esta explicação não substitui a decisão original. Dados fictícios.
          </p>
          <PrototypeBadge />
        </footer>
      </div>
    </main>
  );
}
