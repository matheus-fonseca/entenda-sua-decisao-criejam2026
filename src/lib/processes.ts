import { processes } from "@/lib/data/processes";
import type { Decision, DocumentType, Process } from "@/lib/types";

/**
 * Camada de acesso aos dados. Hoje lê dados fictícios locais;
 * no futuro pode ser trocada por chamadas a uma API sem alterar as telas.
 */

export function getProcesses(): Process[] {
  return processes;
}

export function getProcessById(id: string): Process | undefined {
  return processes.find((p) => p.id === id);
}

export function getProcessIds(): { id: string }[] {
  return processes.map((p) => ({ id: p.id }));
}

/** Resumo enxuto para a lista lateral (componente client). */
export type ProcessListItem = Pick<
  Process,
  "id" | "number" | "area" | "title" | "court" | "className" | "status" | "statusLabel"
> & { partiesText: string };

export function getProcessListItems(): ProcessListItem[] {
  return processes.map((p) => ({
    id: p.id,
    number: p.number,
    area: p.area,
    title: p.title,
    court: p.court,
    className: p.className,
    status: p.status,
    statusLabel: p.statusLabel,
    partiesText: p.parties.map((party) => party.name).join(" x "),
  }));
}

/** Nome em linguagem cidadã de cada tipo de documento (o nome técnico fica como detalhe). */
const citizenLabels: Record<DocumentType, string> = {
  Sentença: "Decisão do juiz",
  Acórdão: "Decisão do tribunal",
};

export function decisionLabel(decision: Decision): string {
  return citizenLabels[decision.documentType];
}

/** Decisão mais recente (a última da lista cronológica). */
export function getLatestDecision(process: Process): Decision {
  return process.decisions[process.decisions.length - 1];
}

export function getDecision(process: Process, decisionId: string): Decision | undefined {
  return process.decisions.find((d) => d.id === decisionId);
}

export function isLatestDecision(process: Process, decision: Decision): boolean {
  return getLatestDecision(process).id === decision.id;
}

/** Todas as combinações processo × decisão, para pré-renderização. */
export function getDecisionParams(): { id: string; decisaoId: string }[] {
  return processes.flatMap((p) => p.decisions.map((d) => ({ id: p.id, decisaoId: d.id })));
}

/** A decisão mais recente usa a URL do processo; as anteriores, /decisoes/[decisaoId]. */
export function decisionHref(process: Process, decisionId: string): string {
  return getLatestDecision(process).id === decisionId
    ? `/processos/${process.id}`
    : `/processos/${process.id}/decisoes/${decisionId}`;
}

export function originalDocumentHref(process: Process, decisionId: string): string {
  return `/processos/${process.id}/decisoes/${decisionId}/original`;
}

/** Título da segunda seção: muda quando a decisão já foi superada por outra. */
export function nextSectionTitle(isLatest: boolean): string {
  return isLatest ? "O que pode acontecer agora?" : "O que aconteceu depois?";
}

/** Texto usado pelo "Ouvir explicação" e pelo avatar de demonstração. */
export function buildSpokenExplanation(process: Process, decision: Decision): string {
  const isLatest = isLatestDecision(process, decision);
  const parts: string[] = [];

  if (!isLatest) {
    parts.push("Atenção: esta não é a decisão mais recente do processo.");
  }
  parts.push(decision.headline, decision.subheadline);

  if (decision.explanation) {
    parts.push(`Por que ${decision.decidedBy} decidiu assim?`, ...decision.explanation.why);
    parts.push(nextSectionTitle(isLatest), ...decision.explanation.whatNext);
  } else {
    parts.push(
      "Recomendamos ler a decisão original e, se precisar, falar com o Balcão Virtual ou com quem representa você no processo.",
    );
  }

  parts.push("Esta explicação não substitui a decisão original.");
  return parts.join(" ");
}
