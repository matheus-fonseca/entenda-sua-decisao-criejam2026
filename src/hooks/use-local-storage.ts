"use client";

import { useCallback, useSyncExternalStore } from "react";

const CHANGE_EVENT = "entenda:local-storage";

/** Fallback em memória quando o localStorage está bloqueado (ex.: navegação privada). */
const memoryStore = new Map<string, string>();

function read(key: string): string | null {
  try {
    const value = window.localStorage.getItem(key);
    if (value !== null) return value;
  } catch {
    // localStorage indisponível: usa a memória.
  }
  return memoryStore.get(key) ?? null;
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

/**
 * Lê e grava um valor de texto no localStorage, sincronizado entre componentes.
 * No servidor (e na primeira renderização) o valor é sempre null.
 */
export function useLocalStorage(key: string): [string | null, (value: string | null) => void] {
  const value = useSyncExternalStore(
    subscribe,
    () => read(key),
    () => null,
  );

  const setValue = useCallback(
    (next: string | null) => {
      if (next === null) memoryStore.delete(key);
      else memoryStore.set(key, next);
      try {
        if (next === null) window.localStorage.removeItem(key);
        else window.localStorage.setItem(key, next);
      } catch {
        // Ignora: o valor fica guardado apenas em memória nesta sessão.
      }
      window.dispatchEvent(new Event(CHANGE_EVENT));
    },
    [key],
  );

  return [value, setValue];
}
