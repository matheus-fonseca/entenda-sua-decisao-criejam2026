"use client";

import { useCallback, useEffect } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";

const STEPS = [87.5, 100, 112.5, 125] as const;
const DEFAULT_INDEX = 1;

/** Controla o tamanho da fonte base (A+ / A / A-), persistido no navegador. */
export function useFontScale() {
  const [stored, setStored] = useLocalStorage("entenda:font-scale");
  const parsed = stored === null ? DEFAULT_INDEX : Number(stored);
  const index = Number.isInteger(parsed) && parsed >= 0 && parsed < STEPS.length ? parsed : DEFAULT_INDEX;

  useEffect(() => {
    document.documentElement.style.fontSize = `${STEPS[index]}%`;
  }, [index]);

  const increase = useCallback(() => setStored(String(Math.min(index + 1, STEPS.length - 1))), [index, setStored]);
  const decrease = useCallback(() => setStored(String(Math.max(index - 1, 0))), [index, setStored]);
  const reset = useCallback(() => setStored(null), [setStored]);

  return {
    increase,
    decrease,
    reset,
    canIncrease: index < STEPS.length - 1,
    canDecrease: index > 0,
    isDefault: index === DEFAULT_INDEX,
    percent: STEPS[index],
  };
}
