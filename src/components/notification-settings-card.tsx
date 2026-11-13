"use client";

import { useId } from "react";
import { Bell } from "lucide-react";
import { NotificationControls, NotificationDemoNote } from "@/components/notification-controls";
import { Switch } from "@/components/ui/switch";
import { useNotificationSettings } from "@/hooks/use-notification-settings";

/** Avisos de novidades para todos os processos (atuais e novos), na lista de processos. */
export function NotificationSettingsCard() {
  const { settings, setAll, setGlobalChannel } = useNotificationSettings();
  const switchId = useId();
  const helpId = useId();

  return (
    <section aria-labelledby="avisos-titulo" className="mt-6 rounded-2xl border border-border bg-white p-4 shadow-xs sm:p-5">
      <div className="flex items-center gap-2.5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
          <Bell className="size-5" aria-hidden="true" />
        </span>
        <h2 id="avisos-titulo" className="font-heading text-lg font-bold text-brand-strong">
          Avisos de novidades
        </h2>
      </div>

      <label
        htmlFor={switchId}
        className="mt-3 flex min-h-12 cursor-pointer items-center gap-3 rounded-lg bg-brand-softer px-3 py-2"
      >
        <span className="flex-1">
          <span className="block text-[0.95rem] font-semibold">Todos os processos</span>
          <span id={helpId} className="block text-sm leading-snug text-muted-foreground">
            Vale para os atuais e para os que você receber depois.
          </span>
        </span>
        <Switch id={switchId} checked={settings.all} onCheckedChange={setAll} aria-describedby={helpId} />
      </label>

      {settings.all ? (
        <div className="mt-3">
          <p className="mb-2 text-sm text-muted-foreground">Receber avisos por:</p>
          <NotificationControls value={settings.global} onChange={setGlobalChannel} />
        </div>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">
          Desligado: escolha os avisos dentro de cada processo.
        </p>
      )}

      <div className="mt-3">
        <NotificationDemoNote />
      </div>
    </section>
  );
}
