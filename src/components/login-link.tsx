"use client";

import Link from "next/link";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { LOGIN_PENDING_KEY } from "@/lib/login-flag";

/** Botão "Entrar": marca o login para o splash de processamento aparecer em /processos. */
export function LoginLink({ className, children }: { className?: string; children: React.ReactNode }) {
  const [, setPending] = useLocalStorage(LOGIN_PENDING_KEY);

  return (
    <Link href="/processos" className={className} onClick={() => setPending("1")}>
      {children}
    </Link>
  );
}
