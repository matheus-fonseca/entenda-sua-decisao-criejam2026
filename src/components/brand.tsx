import Image from "next/image";
import { cn } from "@/lib/utils";

/** Faixas decorativas no canto do cabeçalho (inspiração visual, não é logotipo oficial). */
export function BrandSwoosh({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 96 64"
      className={cn("pointer-events-none absolute top-0 left-0 h-16 w-20 sm:w-24", className)}
      preserveAspectRatio="none"
    >
      <path d="M0 0H96C62 4 28 22 0 64Z" fill="#2f7fd8" />
      <path d="M0 0H66C42 6 18 22 0 46Z" fill="#f2c230" />
      <path d="M0 0H38C22 5 9 14 0 26Z" fill="#2e9e52" />
    </svg>
  );
}

/** Proporção do SVG vetorizado a partir de references/logo-referencia.jpeg (832 × 171). */
const LOGO_RATIO = 832 / 171;

/** Identidade do produto para o cabeçalho azul: logo Explica.AI em branco | Jus.br. */
export function BrandLockup() {
  return (
    <div className="flex min-w-0 items-center gap-3 text-white sm:gap-4">
      <Image
        src="/explica-ai-branco.svg"
        alt="Explica.AI"
        width={Math.round(36 * LOGO_RATIO)}
        height={36}
        priority
        unoptimized
        className="h-7 w-auto shrink-0 sm:h-9"
      />
      <span aria-hidden="true" className="hidden h-6 w-px shrink-0 bg-white/40 sm:block" />
      <span className="font-heading hidden text-[1.3rem] leading-none font-bold tracking-tight sm:inline sm:text-[1.55rem]">
        Jus.br
      </span>
    </div>
  );
}
