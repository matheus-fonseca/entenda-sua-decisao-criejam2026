"use client";

import Link from "next/link";
import { Accessibility, ChevronDown, LogOut, FolderOpen, UserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFontScale } from "@/hooks/use-font-scale";
import { cn } from "@/lib/utils";

const headerButton =
  "inline-flex items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 disabled:opacity-40 disabled:hover:bg-transparent";

export function HeaderControls() {
  const font = useFontScale();

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(headerButton, "size-10 bg-white/10")}
          aria-label="Recursos de acessibilidade"
        >
          <Accessibility className="size-5" aria-hidden="true" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel>Acessibilidade</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <a href="#conteudo">Ir para o conteúdo principal</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="#meus-processos">Ir para Meus processos</a>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Tamanho do texto ({font.percent}%)</DropdownMenuLabel>
          <DropdownMenuItem disabled={!font.canIncrease} onSelect={(e) => { e.preventDefault(); font.increase(); }}>
            Aumentar texto
          </DropdownMenuItem>
          <DropdownMenuItem disabled={font.isDefault} onSelect={(e) => { e.preventDefault(); font.reset(); }}>
            Tamanho padrão
          </DropdownMenuItem>
          <DropdownMenuItem disabled={!font.canDecrease} onSelect={(e) => { e.preventDefault(); font.decrease(); }}>
            Diminuir texto
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="hidden items-center md:flex" role="group" aria-label="Tamanho do texto">
        <button
          type="button"
          className={cn(headerButton, "size-9 font-heading text-lg font-bold")}
          onClick={font.increase}
          disabled={!font.canIncrease}
          aria-label="Aumentar texto"
        >
          A<sup className="text-xs">+</sup>
        </button>
        <button
          type="button"
          className={cn(headerButton, "size-9 font-heading text-base font-bold")}
          onClick={font.reset}
          aria-label="Tamanho padrão do texto"
          aria-pressed={font.isDefault}
        >
          A
        </button>
        <button
          type="button"
          className={cn(headerButton, "size-9 font-heading text-sm font-bold")}
          onClick={font.decrease}
          disabled={!font.canDecrease}
          aria-label="Diminuir texto"
        >
          A<sup className="text-xs">−</sup>
        </button>
      </div>

      <span aria-hidden="true" className="mx-1 hidden h-7 w-px bg-white/30 md:block" />

      <DropdownMenu>
        <DropdownMenuTrigger
          className="inline-flex h-10 items-center gap-2 rounded-full bg-white/10 px-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20 sm:px-4"
          aria-label="Menu do usuário: Maria (perfil fictício)"
        >
          <UserRound className="size-5" aria-hidden="true" />
          <span className="hidden sm:inline">Olá, Maria</span>
          <ChevronDown className="size-4" aria-hidden="true" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-60">
          <DropdownMenuLabel className="font-normal">
            <span className="block font-semibold text-foreground">Maria Souza</span>
            <span className="text-xs text-muted-foreground">Perfil fictício de demonstração</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/processos">
              <FolderOpen aria-hidden="true" /> Meus processos
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/">
              <LogOut aria-hidden="true" /> Sair da demonstração
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
