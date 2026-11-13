import Link from "next/link";
import { LogOut, UserRound } from "lucide-react";
import { BrandLockup, BrandSwoosh } from "@/components/brand";

/** Cabeçalho do painel de gestão (perfil fictício de gestor do CNJ). */
export function ManagerHeader() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only z-[60] rounded-md bg-white px-4 py-2 font-semibold text-brand-strong focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Pular para o conteúdo
      </a>
      <header className="relative z-40 overflow-hidden bg-gradient-to-r from-navy-deep via-navy to-navy-deep text-white shadow-sm">
        <BrandSwoosh />
        <div className="relative flex h-16 items-center justify-between gap-2 pr-3 pl-12 sm:gap-3 sm:pr-5 sm:pl-24">
          <Link href="/" className="min-w-0 rounded-md" aria-label="Explica.AI — Jus.br. Voltar ao login">
            <BrandLockup />
          </Link>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-sm font-semibold sm:inline-flex">
              <UserRound className="size-4.5" aria-hidden="true" />
              Gestor CNJ (perfil fictício)
            </span>
            <Link
              href="/"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-white/10 px-3.5 text-sm font-semibold transition-colors hover:bg-white/20"
            >
              <LogOut className="size-4.5" aria-hidden="true" />
              Sair
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
