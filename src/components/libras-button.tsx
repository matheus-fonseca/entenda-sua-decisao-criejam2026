"use client";

import { useEffect, useRef, useState } from "react";
import { LibrasIcon } from "@/components/libras-icon";
import { cn } from "@/lib/utils";

const NOT_READY =
  "O tradutor de Libras não carregou. Verifique sua conexão e tente de novo. Se continuar, fale com o Balcão Virtual para pedir um intérprete.";
const OPENED_FOR_SCREEN_READER =
  "Tradutor de Libras acionado. É uma tradução automática e não substitui a decisão original.";

/** Botão flutuante do VLibras: fica dentro do shadow root de #vlibras-access-wrapper. */
function findLauncher(): HTMLElement | null {
  const root = document.getElementById("vlibras-access-wrapper")?.shadowRoot;
  return (
    root?.querySelector<HTMLElement>("#vlibras-button") ??
    root?.querySelector<HTMLElement>("button") ??
    document.querySelector<HTMLElement>("#vlibras-button")
  );
}

interface LibrasButtonProps {
  className?: string;
  /** Mostra só o ícone em telas pequenas (cabeçalho). */
  compactOnMobile?: boolean;
  /** Chamado antes de abrir (ex.: parar o áudio). */
  onBeforeOpen?: () => void;
  /** Se informado, o aviso de erro é exibido pelo pai; senão, aparece um aviso flutuante. */
  onMessage?: (message: string) => void;
}

/** Aciona o botão que o widget VLibras injeta na página. Só mostra texto se o widget não carregou. */
export function LibrasButton({ className, compactOnMobile, onBeforeOpen, onMessage }: LibrasButtonProps) {
  const [floating, setFloating] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  /** Mensagem de erro visível ("" limpa). */
  function showError(message: string) {
    if (onMessage) {
      onMessage(message);
      return;
    }
    window.clearTimeout(timer.current);
    setFloating(message);
    if (message) timer.current = window.setTimeout(() => setFloating(""), 8000);
  }

  function open() {
    const launcher = findLauncher();
    if (!launcher) {
      setAnnouncement("");
      showError(NOT_READY);
      return;
    }
    onBeforeOpen?.();
    showError("");
    launcher.click();
    // Confirmação só para leitor de tela: não ocupa espaço na tela.
    setAnnouncement(OPENED_FOR_SCREEN_READER);
    window.setTimeout(() => setAnnouncement(""), 4000);
  }

  return (
    <>
      <button type="button" onClick={open} aria-label="Ver em Libras" className={className}>
        <LibrasIcon className="size-6 shrink-0" />
        <span className={cn(compactOnMobile && "hidden sm:inline")}>
          {compactOnMobile ? "Libras" : "Ver em Libras"}
        </span>
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {announcement}
      </span>
      {!onMessage && (
        <p
          role="status"
          aria-live="polite"
          className={cn(
            floating
              ? "fixed top-[4.5rem] right-3 z-50 w-[min(20rem,calc(100vw-1.5rem))] rounded-lg bg-white p-3 text-sm text-foreground shadow-lg ring-1 ring-border"
              : "sr-only",
          )}
        >
          {floating}
        </p>
      )}
    </>
  );
}
