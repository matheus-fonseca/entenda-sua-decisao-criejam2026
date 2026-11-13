import type { Metadata } from "next";
import { DashboardView } from "@/components/dashboard/dashboard-view";
import { PrototypeBadge } from "@/components/prototype-badge";

export const metadata: Metadata = { title: "Painel de gestão" };

export default function GestaoPage() {
  return (
    <main id="conteudo" className="flex-1">
      <div className="mx-auto flex w-full max-w-[72rem] flex-col gap-5 px-4 py-5 sm:px-8 sm:py-8">
        <div>
          <h1 className="font-heading text-[1.75rem] leading-tight font-bold text-brand-strong sm:text-[2.1rem]">
            Painel de gestão
          </h1>
          <p className="mt-1 max-w-3xl text-[0.98rem] leading-snug text-foreground/85">
            Acompanhe se o serviço está sendo usado, se o cidadão entende e se a explicação está correta.
            Só uma parte dos cidadãos clica nos botões de avaliação, então os percentuais usam todas as explicações como base.
          </p>
          <div className="mt-2">
            <PrototypeBadge />
          </div>
        </div>
        <DashboardView />
      </div>
    </main>
  );
}
