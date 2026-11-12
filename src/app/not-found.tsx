import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <main id="conteudo" className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-brand-soft text-brand">
        <FileQuestion className="size-7" aria-hidden="true" />
      </span>
      <h1 className="font-heading text-2xl font-bold text-brand-strong">Página não encontrada</h1>
      <p className="max-w-md text-muted-foreground">
        Não encontramos este processo ou documento. Os dados deste protótipo são fictícios.
      </p>
      <Link
        href="/processos"
        className="inline-flex h-10 items-center rounded-lg bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-strong"
      >
        Ir para Meus processos
      </Link>
    </main>
  );
}
