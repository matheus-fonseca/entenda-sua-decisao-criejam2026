"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Square, Volume2 } from "lucide-react";
import { AvatarDemoModal } from "@/components/avatar-demo-modal";
import { cn } from "@/lib/utils";

type SpeechState = "idle" | "speaking" | "unavailable" | "error";

function isSpeechSupported() {
  return "speechSynthesis" in window && typeof window.SpeechSynthesisUtterance === "function";
}

/** Divide em frases: alguns navegadores interrompem falas longas. */
function splitSentences(text: string) {
  const parts = text.match(/[^.!?]+[.!?]*/g)?.map((s) => s.trim()).filter(Boolean);
  return parts && parts.length > 0 ? parts : [text];
}

function pickVoice(synth: SpeechSynthesis) {
  const voices = synth.getVoices();
  const lang = (v: SpeechSynthesisVoice) => v.lang.toLowerCase().replace("_", "-");
  return voices.find((v) => lang(v) === "pt-br") ?? voices.find((v) => lang(v).startsWith("pt"));
}

const messages: Record<SpeechState, string> = {
  idle: "",
  speaking: "Reproduzindo a explicação em áudio.",
  unavailable:
    "Seu navegador não oferece leitura em voz alta. Você pode ler o texto desta página ou usar o leitor de tela do seu dispositivo.",
  error: "Não foi possível reproduzir o áudio neste navegador. Tente novamente ou leia o texto desta página.",
};

const controlButton =
  "inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border bg-white px-5 font-heading text-[1.1rem] font-bold transition-all duration-150 hover:-translate-y-px hover:shadow-sm active:translate-y-0 sm:w-auto";

export function AccessibilityControls({ text }: { text: string }) {
  const [state, setState] = useState<SpeechState>("idle");
  const runRef = useRef(0);

  const stop = useCallback(() => {
    runRef.current += 1;
    if (isSpeechSupported()) window.speechSynthesis.cancel();
    setState("idle");
  }, []);

  const play = useCallback(() => {
    if (!isSpeechSupported()) {
      setState("unavailable");
      return;
    }
    const synth = window.speechSynthesis;
    synth.cancel();
    const run = ++runRef.current;
    const voice = pickVoice(synth);
    const sentences = splitSentences(text);
    let started = false;

    const fail = () => {
      if (runRef.current !== run) return;
      runRef.current += 1;
      synth.cancel();
      setState("error");
    };

    sentences.forEach((sentence, index) => {
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.lang = "pt-BR";
      utterance.rate = 0.95;
      if (voice) utterance.voice = voice;
      utterance.onstart = () => {
        started = true;
      };
      utterance.onerror = (event) => {
        if (event.error === "interrupted" || event.error === "canceled") return;
        fail();
      };
      if (index === sentences.length - 1) {
        utterance.onend = () => {
          if (runRef.current === run) setState("idle");
        };
      }
      synth.speak(utterance);
    });

    setState("speaking");
    // Alguns ambientes não têm vozes instaladas e nunca iniciam a fala.
    window.setTimeout(() => {
      if (!started && runRef.current === run) fail();
    }, 4000);
  }, [text]);

  // Interrompe o áudio ao sair da página ou trocar de processo.
  useEffect(() => () => {
    runRef.current += 1;
    if (isSpeechSupported()) window.speechSynthesis.cancel();
  }, []);

  const speaking = state === "speaking";

  return (
    <section aria-labelledby="recursos-acessibilidade" className="w-full sm:w-auto">
      <h2 id="recursos-acessibilidade" className="sr-only">
        Ouvir ou assistir à explicação
      </h2>
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={speaking ? stop : play}
          aria-pressed={speaking}
          className={cn(
            controlButton,
            speaking
              ? "border-brand-strong bg-brand-strong text-white hover:bg-brand"
              : "border-brand bg-brand text-white hover:bg-brand-strong",
          )}
        >
          {speaking ? (
            <>
              <Square className="size-5 fill-current" aria-hidden="true" />
              Parar áudio
            </>
          ) : (
            <>
              <Volume2 className="size-6" aria-hidden="true" />
              Ouvir explicação
            </>
          )}
        </button>
        <AvatarDemoModal
          text={text}
          triggerClassName={cn(controlButton, "border-brand/40 text-brand-strong hover:border-brand")}
        />
      </div>
      <p
        role="status"
        aria-live="polite"
        className={cn("text-sm text-foreground/80 sm:max-w-md", state === "idle" ? "sr-only" : "mt-2")}
      >
        {messages[state]}
      </p>
    </section>
  );
}
