import { BrandLockup, BrandSwoosh } from "@/components/brand";
import { GovBrMark } from "@/components/govbr-mark";
import { LoginLink } from "@/components/login-link";
import { PrototypeBadge } from "@/components/prototype-badge";
import Link from "next/link";
import { BookOpenText, Info, ListChecks, Volume2 } from "lucide-react";

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

      {/* No celular: apresentação curta → login → recursos, tudo sem rolagem. No desktop: duas colunas. */}
      <main
        id="conteudo"
        className="mx-auto grid w-full max-w-6xl flex-1 content-center gap-4 px-4 py-5 sm:gap-8 sm:px-6 sm:py-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-x-16 lg:gap-y-8 lg:py-16"
      >
        <section aria-labelledby="titulo-app" className="lg:col-start-1 lg:row-start-1 lg:self-end">
          <h1
            id="titulo-app"
            className="font-heading text-[1.75rem] leading-tight font-bold text-brand-strong sm:text-[2.6rem]"
          >
            Entenda a Decisão
          </h1>
          <p className="mt-1.5 max-w-xl text-base leading-relaxed text-foreground/85 sm:mt-3 sm:text-lg">
            Saiba, em linguagem simples, o que foi decidido no seu processo.
          </p>
        </section>

        <section
          aria-labelledby="titulo-acesso"
          className="rounded-2xl border border-border bg-white p-5 shadow-md shadow-navy/5 sm:p-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center"
        >
          <h2 id="titulo-acesso" className="font-heading text-xl font-bold text-foreground sm:text-2xl">
            Acesse seus processos
          </h2>
          <p className="mt-1 hidden text-[0.95rem] leading-snug text-muted-foreground sm:mt-2 sm:block sm:leading-relaxed">
            Use sua conta para ver as decisões dos seus processos.
          </p>

          <LoginLink
            className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-brand px-6 text-base font-semibold text-white shadow-sm transition-all duration-150 hover:-translate-y-px hover:bg-brand-strong hover:shadow-md sm:mt-6"
          >
            Entrar com
            <GovBrMark />
            <span className="sr-only">gov.br</span>
          </LoginLink>

          <div className="mt-3 flex gap-2.5 rounded-lg border border-warn-border bg-warn-soft px-3 py-2.5 text-sm leading-snug sm:mt-5 sm:px-4 sm:py-3 sm:leading-relaxed">
            <Info className="mt-0.5 size-4.5 shrink-0 text-warn" aria-hidden="true" />
            <p>
              <strong>Demonstração.</strong> Nenhum login real é feito no gov.br. Todos os dados são fictícios.
            </p>
          </div>

          <Link
            href="/gestao"
            className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-full text-sm font-semibold text-brand underline underline-offset-4 hover:text-brand-strong sm:mt-4"
          >
            Acesso para gestores (demonstração)
          </Link>

          <div className="mt-6 hidden justify-center sm:flex">
            <PrototypeBadge />
          </div>
        </section>

        <ul
          aria-label="O que você encontra"
          className="grid grid-cols-3 gap-2 sm:gap-4 lg:col-start-1 lg:row-start-2 lg:grid-cols-1 lg:self-start max-sm:[@media(max-height:650px)]:hidden"
        >
          {features.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-white p-2.5 text-center shadow-xs sm:flex-row sm:items-start sm:gap-3 sm:p-4 sm:text-left"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand sm:size-10">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="font-heading block text-[0.95rem] leading-tight font-bold sm:text-[1.05rem]">
                  {title}
                </span>
                <span className="hidden text-sm text-muted-foreground sm:block">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </main>

      <footer className="border-t border-border px-4 py-3 text-center text-xs text-muted-foreground sm:py-4">
        <span className="sm:hidden">Protótipo ilustrativo. Não é um sistema oficial.</span>
        <span className="hidden sm:inline">
          Protótipo de oficina de inovação do Poder Judiciário. Não é um sistema oficial.
        </span>
      </footer>
    </div>
  );
}
