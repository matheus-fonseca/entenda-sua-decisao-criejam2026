import { BrandLockup, BrandSwoosh } from "@/components/brand";
import { HeaderControls } from "@/components/header-controls";
import { LibrasButton } from "@/components/libras-button";
import Link from "next/link";

export function AppHeader() {
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
          <Link
            href="/processos"
            className="min-w-0 rounded-md"
            aria-label="Explica.AI — Jus.br. Ir para Meus processos"
          >
            <BrandLockup />
          </Link>
          <div className="flex shrink-0 items-center gap-2">
            <LibrasButton
              compactOnMobile
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/30 px-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            />
            <HeaderControls />
          </div>
        </div>
      </header>
    </>
  );
}
