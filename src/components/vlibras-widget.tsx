"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    VLibras?: { Widget: new (url: string) => unknown };
    __vlibrasStarted?: boolean;
  }
}

const VLIBRAS_URL = "https://vlibras.gov.br/app";
const SCRIPT_ID = "vlibras-plugin-script";

/** Marcação exigida pelo VLibras (atributos proprietários). */
const VLIBRAS_MARKUP = `
<div vw class="enabled">
  <div vw-access-button class="active"></div>
  <div vw-plugin-wrapper>
    <div class="vw-plugin-top-wrapper"></div>
  </div>
</div>`;

function start() {
  if (window.__vlibrasStarted || !window.VLibras) return;
  window.__vlibrasStarted = true;
  new window.VLibras.Widget(VLIBRAS_URL);
}

/**
 * Widget oficial do VLibras (Governo Federal): traduz o texto da página para Libras.
 * A marcação e o script são inseridos direto no body, fora da árvore do React,
 * porque o plugin altera esse DOM e o React o recriaria na hidratação.
 */
export function VLibrasWidget() {
  useEffect(() => {
    if (!document.querySelector("[vw]")) {
      const container = document.createElement("div");
      container.innerHTML = VLIBRAS_MARKUP;
      document.body.appendChild(container);
    }

    if (window.VLibras) {
      start();
      return;
    }

    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = `${VLIBRAS_URL}/vlibras-plugin.js`;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener("load", start);
    return () => script?.removeEventListener("load", start);
  }, []);

  return null;
}
