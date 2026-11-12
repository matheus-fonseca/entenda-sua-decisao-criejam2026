import Link from "next/link";
import { BookOpenText, Info, ListChecks, LogIn, Volume2 } from "lucide-react";
import { BrandLockup, BrandSwoosh } from "@/components/brand";
import { PrototypeBadge } from "@/components/prototype-badge";
import { DEFAULT_PROCESS_ID } from "@/lib/processes";

const features = [
  { icon: BookOpenText, title: "Linguagem simples", text: "Saiba o que foi decidido, sem palavras difíceis." },
  { icon: ListChecks, title: "Etapas do processo", text: "Veja o que já aconteceu e o que ainda pode acontecer." },
  { icon: Volume2, title: "Ouça a explicação", text: "Recursos de áudio e de acessibilidade." },
];

export default function LoginPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-gradient-to-b from-surface to-white">
      <header className="relative overflow-hidden bg-gradient-to-r from-navy-deep via-navy to-navy-deep">
        <BrandSwoosh />
        <div className="relative flex h-16 items-center pr-4 pl-14 sm:pl-24">
          <BrandLockup />
        </div>
      </header>

      <main id="conteudo" className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-16">
        <section aria-labelledby="titulo-app">
          <p className="text-sm font-semibold tracking-wide text-brand uppercase">Minha Justiça</p>
          <h1 id="titulo-app" className="font-heading mt-2 text-[2.1rem] leading-tight font-bold text-brand-strong sm:text-[2.6rem]">
            Entenda a Decisão
          </h1>
          <p className="mt-3 max-w-xl text-lg leading-relaxed text-foreground/85">
            Explicações de decisão e acórdãos em linguagem simples, para você saber o que foi decidido no seu
            processo e o que pode acontecer depois.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {features.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-3 rounded-xl border border-border bg-white p-4 shadow-xs">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="font-heading block text-[1.05rem] font-bold">{title}</span>
                  <span className="text-sm text-muted-foreground">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="titulo-acesso"
          className="rounded-2xl border border-border bg-white p-6 shadow-md shadow-navy/5 sm:p-8"
        >
          <h2 id="titulo-acesso" className="font-heading text-2xl font-bold text-foreground">
            Acesse seus processos
          </h2>
          <p className="mt-2 text-[0.98rem] leading-relaxed text-muted-foreground">
            Use sua conta para ver as decisões dos processos em que você é parte.
          </p>

          <Link
            href={`/processos/${DEFAULT_PROCESS_ID}`}
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-brand px-6 text-base font-semibold text-white shadow-sm transition-all duration-150 hover:-translate-y-px hover:bg-brand-strong hover:shadow-md"
          >
            <LogIn className="size-5" aria-hidden="true" />
            Entrar com Gov.br (demonstração)
          </Link>

          <div className="mt-5 flex gap-3 rounded-lg border border-warn-border bg-warn-soft px-4 py-3 text-sm leading-relaxed">
            <Info className="mt-0.5 size-4.5 shrink-0 text-warn" aria-hidden="true" />
            <p>
              <strong>Ambiente de demonstração.</strong> Nenhum login real é feito e nenhuma conta Gov.br é
              acessada. Todos os nomes, processos e documentos são fictícios.
            </p>
          </div>

          <div className="mt-6 flex justify-center">
            <PrototypeBadge />
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-4 py-4 text-center text-xs text-muted-foreground">
        Protótipo de oficina de inovação do Poder Judiciário. Não é um sistema oficial.
      </footer>
    </div>
  );
}
