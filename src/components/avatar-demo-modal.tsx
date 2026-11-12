"use client";

import { FlaskConical } from "lucide-react";
import { AvatarIllustration } from "@/components/avatar-illustration";
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

interface AvatarDemoModalProps {
  text: string;
  triggerClassName?: string;
}

/** Demonstração claramente identificada: não há vídeo nem serviço externo. */
export function AvatarDemoModal({ text, triggerClassName }: AvatarDemoModalProps) {
  return (
    <Dialog>
      <DialogTrigger className={triggerClassName}>
        <AvatarIllustration className="size-8" />
        <span>Assistir com avatar</span>
      </DialogTrigger>
      <DialogContent className="max-h-[90dvh] gap-5 overflow-y-auto p-5 sm:max-w-lg sm:p-6">
        <DialogHeader className="gap-2 text-left">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-warn-soft px-2.5 py-1 text-xs font-semibold text-warn ring-1 ring-warn-border">
            <FlaskConical className="size-3.5" aria-hidden="true" />
            Demonstração · sem vídeo real
          </span>
          <DialogTitle className="font-heading text-xl font-bold text-brand-strong">
            Assistir com avatar
          </DialogTitle>
          <DialogDescription className="text-[0.95rem] leading-relaxed text-muted-foreground">
            Em uma versão futura, um avatar poderá apresentar esta explicação em vídeo ou em Libras.
            Nesta demonstração, nenhum vídeo é reproduzido e nenhum serviço externo é acionado.
          </DialogDescription>
        </DialogHeader>

        <figure className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-brand/30 bg-gradient-to-b from-brand-soft to-white px-4 py-6 text-center">
          <AvatarIllustration className="size-24" />
          <figcaption className="text-sm font-medium text-muted-foreground">
            Imagem ilustrativa estática — protótipo
          </figcaption>
        </figure>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-foreground">Texto que o avatar apresentaria</h3>
          <p className="max-h-48 overflow-y-auto rounded-lg bg-muted px-4 py-3 text-[0.95rem] leading-relaxed">
            {text}
          </p>
        </div>

        <DialogFooter className="mx-0 mb-0 rounded-none border-t-0 bg-transparent p-0">
          <DialogClose asChild>
            <Button className="h-10 px-5">Fechar demonstração</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
