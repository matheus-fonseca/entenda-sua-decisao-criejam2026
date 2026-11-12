import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProcessDecisionView } from "@/components/process-decision-view";
import { getLatestDecision, getProcessById, getProcessIds } from "@/lib/processes";

export function generateStaticParams() {
  return getProcessIds();
}

export async function generateMetadata({ params }: PageProps<"/processos/[id]">): Promise<Metadata> {
  const { id } = await params;
  const process = getProcessById(id);
  return { title: process ? `${process.title} · ${process.court}` : "Processo não encontrado" };
}

/** Abre o processo na explicação da decisão mais recente. */
export default async function ProcessPage({ params }: PageProps<"/processos/[id]">) {
  const { id } = await params;
  const process = getProcessById(id);
  if (!process) notFound();

  return <ProcessDecisionView process={process} decision={getLatestDecision(process)} />;
}
