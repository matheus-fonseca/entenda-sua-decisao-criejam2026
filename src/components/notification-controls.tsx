"use client";

import { useId } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import type { ChannelSettings, NotificationChannel } from "@/hooks/use-notification-settings";
import { cn } from "@/lib/utils";

const channels: { id: NotificationChannel; label: string; icon: typeof Mail }[] = [
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { id: "email", label: "E-mail", icon: Mail },
];

interface NotificationControlsProps {
  value: ChannelSettings;
  onChange: (channel: NotificationChannel, on: boolean) => void;
  disabled?: boolean;
  className?: string;
}

/** Dois interruptores (WhatsApp e e-mail). A linha inteira é clicável (alvo de toque ≥ 44 px). */
export function NotificationControls({ value, onChange, disabled, className }: NotificationControlsProps) {
  const baseId = useId();

  return (
    <ul className={cn("flex flex-col gap-2", className)}>
      {channels.map(({ id, label, icon: Icon }) => (
        <li key={id}>
          <label
            htmlFor={`${baseId}-${id}`}
            className={cn(
              "flex min-h-12 items-center gap-3 rounded-lg border border-border bg-white px-3 py-2",
              disabled ? "cursor-not-allowed" : "cursor-pointer hover:border-brand/40",
            )}
          >
            <Icon className="size-5 shrink-0 text-brand" aria-hidden="true" />
            <span className="flex-1 text-[0.95rem] font-semibold">{label}</span>
            <span className="text-sm text-muted-foreground" aria-hidden="true">
              {value[id] ? "Ligado" : "Desligado"}
            </span>
            <Switch
              id={`${baseId}-${id}`}
              checked={value[id]}
              disabled={disabled}
              onCheckedChange={(on) => onChange(id, on)}
            />
          </label>
        </li>
      ))}
    </ul>
  );
}

/** Aviso padrão de demonstração dos avisos de novidades. */
export function NotificationDemoNote() {
  return (
    <p className="text-xs leading-snug text-muted-foreground">
      Demonstração: nada é enviado. Em um serviço real, os avisos iriam para o número e o e-mail do seu
      cadastro gov.br.
    </p>
  );
}
