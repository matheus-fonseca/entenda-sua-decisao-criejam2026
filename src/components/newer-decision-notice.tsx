import Link from "next/link";
import { ArrowRight, History } from "lucide-react";
import type { Decision } from "@/lib/types";

interface NewerDecisionNoticeProps {
  latest: Decision;
  href: string;
}

/** Aviso exibido quando a explicação aberta não é da decisão mais recente do processo. */
export function NewerDecisionNotice({ latest, href }: NewerDecisionNoticeProps) {
  return (
    <section
      aria-labelledby="decisao-mais-recente"
      className="flex flex-col gap-3 rounded-xl border border-brand/30 bg-brand-softer px-4 py-3.5 sm:flex-row sm:items-center sm:gap-4 sm:px-5"
    >
      <span className="hidden size-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand sm:flex">
        <History className="size-5" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1 text-[0.95rem] leading-snug">
        <h2 id="decisao-mais-recente" className="font-heading text-[1.1rem] font-bold text-brand-strong">
          Existe uma decisão mais recente neste processo
        </h2>
        <p className="mt-0.5 text-foreground/85">
          Em {latest.date}, {latest.decidedBy} decidiu de novo. O resultado
          pode ser diferente desta explicação.
        </p>
      </div>
      <Link
        href={href}
        className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-strong"
      >
        Ver decisão mais recente
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </section>
  );
}
