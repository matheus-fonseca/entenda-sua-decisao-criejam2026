import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProcessDecisionView } from "@/components/process-decision-view";
import { decisionLabel, getDecision, getDecisionParams, getProcessById } from "@/lib/processes";

export function generateStaticParams() {
  return getDecisionParams();
}

export async function generateMetadata({ params }: PageProps<"/processos/[id]/decisoes/[decisaoId]">): Promise<Metadata> {
  const { id, decisaoId } = await params;
  const process = getProcessById(id);
  const decision = process && getDecision(process, decisaoId);
  return {
    title: process && decision ? `${decisionLabel(decision)} · ${process.title}` : "Decisão não encontrada",
  };
}

/** Explicação de uma decisão específica (inclusive decisões anteriores). */
export default async function DecisionPage({ params }: PageProps<"/processos/[id]/decisoes/[decisaoId]">) {
  const { id, decisaoId } = await params;
  const process = getProcessById(id);
  const decision = process && getDecision(process, decisaoId);
  if (!process || !decision) notFound();

  return <ProcessDecisionView process={process} decision={decision} />;
}
