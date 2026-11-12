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

/** Identidade textual Jus.br | Entenda a decisão | CNJ. */
export function BrandLockup({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-2 text-white sm:gap-4">
      <span className="font-heading text-[1.3rem] leading-none font-bold tracking-tight sm:text-[1.55rem]">
        Jus.br
      </span>
      <span aria-hidden="true" className="h-6 w-px shrink-0 bg-white/40" />
      <span className="font-heading truncate text-[1rem] leading-none font-medium sm:text-xl">
        Entenda a decisão
      </span>
      {!compact && (
        <>
          <span aria-hidden="true" className="hidden h-6 w-px bg-white/40 lg:block" />
          <span className="hidden items-center gap-2 lg:flex">
            <span className="font-heading text-[1.6rem] leading-none font-bold tracking-tighter">
              CNJ
            </span>
            <span className="text-[0.55rem] leading-[1.05] font-semibold tracking-wide uppercase">
              Conselho
              <br />
              Nacional
              <br />
              de Justiça
            </span>
          </span>
        </>
      )}
    </div>
  );
}
