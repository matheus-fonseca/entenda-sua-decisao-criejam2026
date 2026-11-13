"use client";

import { Headset, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface HumanSupportModalProps {
  processNumber: string;
  court: string;
  triggerClassName?: string;
  triggerLabel?: React.ReactNode;
}

/** Orientação sobre o Balcão Virtual. A integração institucional não foi implementada. */
export function HumanSupportModal({ processNumber, court, triggerClassName, triggerLabel }: HumanSupportModalProps) {
  return (
    <Dialog>
      <DialogTrigger className={triggerClassName}>
        {triggerLabel ?? (
          <>
            <Headset className="size-5" aria-hidden="true" />
            <span>Precisa de ajuda? Fale com o Balcão Virtual.</span>
          </>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90dvh] gap-4 overflow-y-auto p-5 sm:max-w-lg sm:gap-5 sm:p-6">
        <DialogHeader className="gap-2 text-left">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
              <Headset className="size-5" aria-hidden="true" />
            </span>
            <DialogTitle className="font-heading text-xl font-bold text-brand-strong">Balcão Virtual</DialogTitle>
          </div>
          <DialogDescription className="text-[0.95rem] leading-snug text-muted-foreground">
            Atendimento por vídeo com a equipe da unidade judiciária, para tirar dúvidas sobre o processo.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg bg-muted px-4 py-3">
          <p className="text-sm text-muted-foreground">Tenha em mãos o número do processo:</p>
          <p className="mt-0.5 text-[1.05rem] font-semibold tabular-nums">{processNumber}</p>
          <p className="text-sm text-muted-foreground">{court}</p>
        </div>

        <p className="text-[0.95rem] leading-snug">
          Quem representa você no processo, como advogado ou Defensoria Pública, também pode ajudar.
        </p>

        <div
          id="balcao-indisponivel"
          className="flex items-start gap-2.5 rounded-lg border border-warn-border bg-warn-soft px-3 py-2.5 text-sm leading-snug text-foreground"
        >
          <Info className="mt-0.5 size-4.5 shrink-0 text-warn" aria-hidden="true" />
          <p>
            <strong>Protótipo:</strong> o Balcão Virtual não está integrado. Nenhum atendimento será aberto.
          </p>
        </div>

        <DialogFooter className="mx-0 mb-0 grid grid-cols-2 gap-2 rounded-none border-t-0 bg-transparent p-0 sm:flex sm:justify-end">
          <Button variant="outline" className="h-11 px-4" disabled aria-describedby="balcao-indisponivel">
            Abrir Balcão
          </Button>
          <DialogClose asChild>
            <Button className="h-11 px-5">Entendi</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
