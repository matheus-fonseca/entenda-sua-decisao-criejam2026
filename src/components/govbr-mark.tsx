import Image from "next/image";
import { cn } from "@/lib/utils";

/** Proporção do SVG oficial (references/logo-govbr.svg, 495 × 178). */
const GOVBR_RATIO = 495 / 178;

/** Marca gov.br do botão de login, sobre um selo branco para manter as cores originais. */
export function GovBrMark({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("inline-flex items-center rounded-md bg-white px-2 py-1", className)}>
      <Image
        src="/govbr.svg"
        alt=""
        width={Math.round(18 * GOVBR_RATIO)}
        height={18}
        unoptimized
        className="h-[1.15rem] w-auto"
      />
    </span>
  );
}
