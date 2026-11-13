"use client";

import { useCallback, useMemo } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";

export type NotificationChannel = "whatsapp" | "email";
export type ChannelSettings = Record<NotificationChannel, boolean>;

interface StoredSettings {
  /** Quando ligado, o ajuste geral vale para todos os processos, atuais e novos. */
  all: boolean;
  global: ChannelSettings;
  perProcess: Record<string, ChannelSettings>;
}

const STORAGE_KEY = "entenda:notificacoes";
/** Padrão: WhatsApp e e-mail começam habilitados, no geral e em cada processo. */
const ON: ChannelSettings = { whatsapp: true, email: true };
const DEFAULTS: StoredSettings = { all: false, global: ON, perProcess: {} };

function toChannels(value: unknown): ChannelSettings {
  const v = (value ?? {}) as Partial<ChannelSettings>;
  return { whatsapp: v.whatsapp === true, email: v.email === true };
}

/** Lê o JSON salvo; qualquer valor inválido volta ao padrão (tudo habilitado). */
function parse(raw: string | null): StoredSettings {
  if (!raw) return DEFAULTS;
  try {
    const data = JSON.parse(raw) as Partial<StoredSettings>;
    const perProcess: Record<string, ChannelSettings> = {};
    for (const [id, value] of Object.entries(data.perProcess ?? {})) perProcess[id] = toChannels(value);
    return { all: data.all === true, global: toChannels(data.global), perProcess };
  } catch {
    return DEFAULTS;
  }
}

/** Preferências de aviso por WhatsApp e e-mail, salvas só no navegador (demonstração: nada é enviado). */
export function useNotificationSettings() {
  const [raw, setRaw] = useLocalStorage(STORAGE_KEY);
  const settings = useMemo(() => parse(raw), [raw]);

  const save = useCallback((next: StoredSettings) => setRaw(JSON.stringify(next)), [setRaw]);

  const setAll = useCallback((on: boolean) => save({ ...settings, all: on }), [save, settings]);

  const setGlobalChannel = useCallback(
    (channel: NotificationChannel, on: boolean) =>
      save({ ...settings, global: { ...settings.global, [channel]: on } }),
    [save, settings],
  );

  const setProcessChannel = useCallback(
    (processId: string, channel: NotificationChannel, on: boolean) =>
      save({
        ...settings,
        perProcess: {
          ...settings.perProcess,
          [processId]: { ...(settings.perProcess[processId] ?? ON), [channel]: on },
        },
      }),
    [save, settings],
  );

  /** Valor que vale para o processo e se ele vem do ajuste geral. */
  const effective = useCallback(
    (processId: string): { channels: ChannelSettings; inherited: boolean } =>
      settings.all
        ? { channels: settings.global, inherited: true }
        : { channels: settings.perProcess[processId] ?? ON, inherited: false },
    [settings],
  );

  return { settings, setAll, setGlobalChannel, setProcessChannel, effective };
}
