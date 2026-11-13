"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Check, Loader2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { LOGIN_PENDING_KEY } from "@/lib/login-flag";
import { cn } from "@/lib/utils";

/** Duração simulada do primeiro processamento por IA. */
const PROCESSING_MS = 5000;
const TICK_MS = 100;

const subscribeNoop = () => () => {};

const stages = [
  "Lendo as decisões",
  "Traduzindo para linguagem simples",
  "Revisando o texto",
  "Montando a linha do tempo",
];

interface FirstAccessGateProps {
  /** Títulos dos processos que serão "processados". */
  processTitles: string[];
  children: React.ReactNode;
}

/**
 * Após cada login mostra um splash simulando a interpretação dos processos por IA (5 s).
 * Sem login pendente (ex.: recarregar a página), abre direto.
 */
export function FirstAccessGate({ processTitles, children }: FirstAccessGateProps) {
  const [pending, setPending] = useLocalStorage(LOGIN_PENDING_KEY);
  // O valor salvo só é conhecido no navegador: antes disso não mostramos nem o splash nem o conteúdo.
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const [elapsed, setElapsed] = useState(0);

  const processing = mounted && pending === "1";

  useEffect(() => {
    if (!processing) return;
    const started = Date.now();
    const timer = window.setInterval(() => {
      const spent = Date.now() - started;
      setElapsed(Math.min(spent, PROCESSING_MS));
      if (spent >= PROCESSING_MS) {
        window.clearInterval(timer);
        setPending(null);
      }
    }, TICK_MS);
    return () => window.clearInterval(timer);
  }, [processing, setPending]);

  // O conteúdo fica sempre renderizado (só oculto) para não quebrar a pré-renderização das rotas.
  const content = <div className={mounted && !processing ? "contents" : "hidden"}>{children}</div>;
  if (!processing) return content;

  const percent = Math.round((elapsed / PROCESSING_MS) * 100);
  const total = processTitles.length;
  const finished = Math.min(total, Math.floor((elapsed / PROCESSING_MS) * total));
  const stage = stages[Math.min(stages.length - 1, Math.floor((elapsed / PROCESSING_MS) * stages.length))];

  return (
    <>
    <main id="conteudo" className="flex-1 bg-gradient-to-b from-surface to-white" aria-busy="true">
      <div className="mx-auto flex w-full max-w-md flex-col gap-5 px-4 py-8 sm:py-14">
        <div>
          <h1 className="font-heading text-[1.6rem] leading-tight font-bold text-brand-strong sm:text-[1.9rem]">
            Estamos preparando seus processos
          </h1>
          <p className="mt-1.5 text-[0.98rem] leading-snug text-foreground/85">
            Nossa inteligência artificial está lendo as decisões e explicando em linguagem simples. Pode levar
            alguns segundos.
          </p>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between text-sm">
            <span className="font-semibold text-brand-strong">{stage}…</span>
            <span className="tabular-nums text-muted-foreground">{percent}%</span>
          </div>
          <div
            role="progressbar"
            aria-label="Preparando seus processos"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            className="h-2.5 overflow-hidden rounded-full bg-brand-soft"
          >
            <div className="h-full rounded-full bg-brand transition-[width] duration-100 ease-linear" style={{ width: `${percent}%` }} />
          </div>
        </div>

        <ul className="flex flex-col gap-2">
          {processTitles.map((title, index) => {
            const isDone = index < finished;
            const isCurrent = index === finished;
            return (
              <li
                key={title}
                className={cn(
                  "flex min-h-12 items-center gap-3 rounded-xl border bg-white px-3.5 py-2",
                  isCurrent ? "border-brand/40 shadow-xs" : "border-border",
                )}
              >
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full",
                    isDone ? "bg-success text-white" : "bg-brand-soft text-brand",
                  )}
                  aria-hidden="true"
                >
                  {isDone ? (
                    <Check className="size-4" strokeWidth={3} />
                  ) : isCurrent ? (
                    <Loader2 className="size-4 animate-spin motion-reduce:animate-none" />
                  ) : null}
                </span>
                <span className={cn("flex-1 text-[0.95rem] font-semibold", !isDone && !isCurrent && "text-muted-foreground")}>
                  {title}
                </span>
                <span className="text-sm text-muted-foreground">{isDone ? "Pronto" : isCurrent ? "Processando" : "Na fila"}</span>
              </li>
            );
          })}
        </ul>

        <p role="status" className="sr-only">
          {finished} de {total} processos prontos. {stage}.
        </p>
        <p className="text-center text-xs text-muted-foreground">Demonstração: o processamento é simulado.</p>
      </div>
    </main>
      {content}
    </>
  );
}
