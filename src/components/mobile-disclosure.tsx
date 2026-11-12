"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileDisclosureProps {
  /** Texto do botão quando o conteúdo está recolhido. */
  openLabel: string;
  /** Texto do botão quando o conteúdo está aberto. */
  closeLabel: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

/**
 * Recolhe o conteúdo só no celular (abaixo de `md`). A partir de `md` o
 * conteúdo fica sempre visível e o botão some, mesmo com o estado fechado.
 */
export function MobileDisclosure({ openLabel, closeLabel, children, className, contentClassName }: MobileDisclosureProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-11 items-center gap-1.5 rounded-md text-[0.95rem] font-semibold text-brand underline decoration-brand/40 underline-offset-4 transition-colors hover:text-brand-strong hover:decoration-brand md:hidden"
      >
        {open ? closeLabel : openLabel}
        <ChevronDown
          className={cn("size-4.5 shrink-0 transition-transform duration-200", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>
      <div id={id} className={cn(contentClassName, !open && "max-md:hidden")}>
        {children}
      </div>
    </div>
  );
}
