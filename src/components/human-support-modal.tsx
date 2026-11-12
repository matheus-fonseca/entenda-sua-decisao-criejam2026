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
      <DialogContent className="max-h-[90dvh] gap-5 overflow-y-auto p-5 sm:max-w-lg sm:p-6">
        <DialogHeader className="gap-2 text-left">
          <span className="flex size-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
            <Headset className="size-6" aria-hidden="true" />
          </span>
          <DialogTitle className="font-heading text-xl font-bold text-brand-strong">Balcão Virtual</DialogTitle>
          <DialogDescription className="text-[0.95rem] leading-relaxed text-muted-foreground">
            O Balcão Virtual é um atendimento por vídeo com a equipe da unidade judiciária. Ele ajuda a tirar
            dúvidas sobre o andamento do processo.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-start gap-3 rounded-lg border border-warn-border bg-warn-soft px-4 py-3 text-sm text-foreground">
          <Info className="mt-0.5 size-4.5 shrink-0 text-warn" aria-hidden="true" />
          <p>
            <strong>Protótipo:</strong> a integração com o Balcão Virtual ainda não foi implementada. Nenhum
            atendimento será aberto a partir desta tela.
          </p>
        </div>

        <div className="text-[0.95rem] leading-relaxed">
          <h3 className="mb-2 font-semibold">Antes de falar com o atendimento</h3>
          <ul className="flex list-disc flex-col gap-1.5 pl-5 marker:text-brand">
            <li>
              Tenha em mãos o número do processo:{" "}
              <span className="font-semibold tabular-nums break-all">{processNumber}</span> ({court}).
            </li>
            <li>Anote suas dúvidas sobre a decisão.</li>
            <li>Se alguém representa você no processo, como advogado ou Defensoria Pública, essa pessoa também pode ajudar.</li>
          </ul>
        </div>

        <DialogFooter className="mx-0 mb-0 flex-col gap-2 rounded-none border-t-0 bg-transparent p-0 sm:flex-row">
          <Button variant="outline" className="h-10 px-4" disabled aria-describedby="balcao-indisponivel">
            Abrir Balcão Virtual
          </Button>
          <DialogClose asChild>
            <Button className="h-10 px-5">Entendi</Button>
          </DialogClose>
        </DialogFooter>
        <p id="balcao-indisponivel" className="-mt-3 text-xs text-muted-foreground sm:text-right">
          Botão desativado: serviço não integrado neste protótipo.
        </p>
      </DialogContent>
    </Dialog>
  );
}
