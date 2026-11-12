import { processes } from "@/lib/data/processes";
import type { Process } from "@/lib/types";

/**
 * Camada de acesso aos dados. Hoje lê dados fictícios locais;
 * no futuro pode ser trocada por chamadas a uma API sem alterar as telas.
 */

export const DEFAULT_PROCESS_ID = "reclamacao-trabalhista";

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

/** Texto usado pelo "Ouvir explicação" e pelo avatar de demonstração. */
export function buildSpokenExplanation(process: Process): string {
  const { decision } = process;
  const parts: string[] = [decision.headline, decision.subheadline];

  if (decision.explanation) {
    parts.push(`Por que ${decision.decidedBy} decidiu assim?`, ...decision.explanation.why);
    parts.push("O que pode acontecer agora?", ...decision.explanation.whatNext);
  } else {
    parts.push(
      "Recomendamos ler a decisão original e, se precisar, falar com o Balcão Virtual ou com quem representa você no processo.",
    );
  }

  parts.push("Esta explicação não substitui a decisão original.");
  return parts.join(" ");
}
