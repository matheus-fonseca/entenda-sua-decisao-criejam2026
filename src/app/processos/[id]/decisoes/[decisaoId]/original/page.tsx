import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, TriangleAlert } from "lucide-react";
import { decisionHref, decisionLabel, getDecision, getDecisionParams, getProcessById } from "@/lib/processes";

export function generateStaticParams() {
  return getDecisionParams();
}

export async function generateMetadata({
  params,
}: PageProps<"/processos/[id]/decisoes/[decisaoId]/original">): Promise<Metadata> {
  const { id, decisaoId } = await params;
  const process = getProcessById(id);
  const decision = process && getDecision(process, decisaoId);
  return {
    title: process && decision ? `${decisionLabel(decision)} (original) · ${process.title}` : "Documento não encontrado",
  };
}

export default async function OriginalDecisionPage({
  params,
}: PageProps<"/processos/[id]/decisoes/[decisaoId]/original">) {
  const { id, decisaoId } = await params;
  const process = getProcessById(id);
  const decision = process && getDecision(process, decisaoId);
  if (!process || !decision) notFound();

  const { original } = decision;

  return (
    <main id="conteudo" className="flex-1 bg-surface">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-5 sm:px-8 sm:py-7">
        <Link
          href={decisionHref(process, decision.id)}
          className="inline-flex w-fit items-center gap-2 rounded-md text-[0.95rem] font-semibold text-brand hover:underline"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Voltar para a explicação
        </Link>

        <div role="note" className="flex gap-3 rounded-lg border border-warn-border bg-warn-soft px-4 py-3 text-sm leading-relaxed">
          <TriangleAlert className="mt-0.5 size-4.5 shrink-0 text-warn" aria-hidden="true" />
          <p>
            <strong>Documento fictício de demonstração.</strong> Este texto foi criado para o protótipo e não é uma
            decisão judicial real. Ele mostra como o documento original costuma ser escrito.
          </p>
        </div>

        <article
          aria-labelledby="titulo-documento"
          className="relative overflow-hidden rounded-md border border-border bg-white px-5 py-8 font-serif text-[0.98rem] leading-relaxed text-foreground shadow-sm sm:px-12 sm:py-12"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center text-[3.5rem] font-bold tracking-widest text-slate-900/[0.04] uppercase select-none sm:text-[6rem]"
            style={{ transform: "rotate(-24deg)" }}
          >
            Fictício
          </span>
          <header className="relative border-b border-border pb-5 text-center">
            <p className="text-xs tracking-widest text-muted-foreground uppercase">Poder Judiciário · {process.court}</p>
            <p className="mt-1 text-sm tabular-nums break-all">Processo nº {process.number}</p>
            <p className="text-sm text-muted-foreground">
              {process.className} · {process.parties.map((p) => `${p.roleLabel}: ${p.name}`).join(" · ")}
            </p>
            <h1 id="titulo-documento" className="mt-4 text-xl font-bold tracking-[0.2em]">
              {original.heading}
            </h1>
          </header>

          <div className="relative mt-6 flex flex-col gap-6">
            {original.sections.map((section) => (
              <section key={section.title}>
                <h2 className="mb-2 text-sm font-bold tracking-wide">{section.title}</h2>
                <div className="flex flex-col gap-3 text-justify hyphens-auto">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <footer className="relative mt-10 border-t border-border pt-4 text-center text-sm text-muted-foreground">
            <p>Data: {decision.date}</p>
            <p>{original.signature}</p>
          </footer>
        </article>
      </div>
    </main>
  );
}
