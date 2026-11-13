"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { NotificationControls, NotificationDemoNote } from "@/components/notification-controls";
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
import { useNotificationSettings } from "@/hooks/use-notification-settings";
import { cn } from "@/lib/utils";

/** Botão "Avisos" da tela do processo: abre o ajuste de WhatsApp e e-mail só deste processo. */
export function ProcessNotificationsButton({ processId }: { processId: string }) {
  const { effective, setProcessChannel } = useNotificationSettings();
  const { channels, inherited } = effective(processId);
  const active = channels.whatsapp || channels.email;
  const summary = [channels.whatsapp && "WhatsApp", channels.email && "e-mail"].filter(Boolean).join(" e ");

  return (
    <Dialog>
      <DialogTrigger className="inline-flex min-h-11 items-center gap-2 rounded-full border border-brand/40 bg-white px-3.5 text-sm font-semibold text-brand-strong transition-colors hover:border-brand">
        <Bell className="size-4.5" aria-hidden="true" />
        <span>Avisos</span>
        <span
          aria-hidden="true"
          className={cn("size-2 rounded-full", active ? "bg-success" : "bg-slate-400")}
        />
        <span className="sr-only">{active ? `: ligados por ${summary}` : ": desligados"}</span>
      </DialogTrigger>
      <DialogContent className="max-h-[90dvh] gap-4 overflow-y-auto p-5 sm:max-w-md sm:p-6">
        <DialogHeader className="gap-1.5 text-left">
          <DialogTitle className="font-heading text-xl font-bold text-brand-strong">Avisos deste processo</DialogTitle>
          <DialogDescription className="text-[0.95rem] leading-snug text-muted-foreground">
            Receba uma mensagem quando houver novidade neste processo.
          </DialogDescription>
        </DialogHeader>

        {inherited && (
          <p role="status" className="rounded-lg bg-brand-softer px-3 py-2 text-sm leading-snug">
            Seguindo a configuração de <strong>todos os processos</strong>.{" "}
            <Link href="/processos" className="font-semibold text-brand underline underline-offset-2">
              Alterar na lista de processos
            </Link>
          </p>
        )}

        <NotificationControls
          value={channels}
          disabled={inherited}
          onChange={(channel, on) => setProcessChannel(processId, channel, on)}
        />
        <NotificationDemoNote />

        <DialogFooter className="mx-0 mb-0 rounded-none border-t-0 bg-transparent p-0">
          <DialogClose asChild>
            <Button className="h-11 w-full px-5 sm:w-auto">Pronto</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
