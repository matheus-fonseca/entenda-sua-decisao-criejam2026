"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useMemo, useState } from "react";
import { ChevronRight, FolderOpen, Search } from "lucide-react";
import { ProcessIcon } from "@/components/process-icon";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { ProcessListItem } from "@/lib/processes";
import { cn } from "@/lib/utils";

function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

function useActiveProcessId() {
  const pathname = usePathname();
  const [, section, id] = pathname.split("/");
  return section === "processos" ? id : undefined;
}

function StatusBadge({ item }: { item: ProcessListItem }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[0.7rem] leading-4 font-semibold whitespace-nowrap",
        item.status === "decisao"
          ? "bg-success-soft text-success-strong ring-1 ring-success-border"
          : "bg-brand-soft text-brand-strong ring-1 ring-brand/15",
      )}
    >
      {item.statusLabel}
    </span>
  );
}

interface ProcessListProps {
  items: ProcessListItem[];
  /** Chamado ao escolher um processo (ex.: fechar o painel no celular). */
  onNavigate?: () => void;
  headingLevel?: "h1" | "h2";
  className?: string;
}

/** Lista "Meus processos" com busca. Reutilizada na barra lateral, no painel móvel e na página de lista. */
export function ProcessList({ items, onNavigate, headingLevel = "h2", className }: ProcessListProps) {
  const [query, setQuery] = useState("");
  const activeId = useActiveProcessId();
  const searchId = useId();
  const Heading = headingLevel;

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return items;
    return items.filter((item) =>
      normalize([item.title, item.number, item.court, item.className, item.partiesText, item.statusLabel].join(" ")).includes(q),
    );
  }, [items, query]);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div>
        <Heading id="meus-processos" tabIndex={-1} className="font-heading text-[1.75rem] leading-tight font-bold text-brand-strong">
          Meus processos
        </Heading>
        <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted-foreground">
          Acesse e entenda as decisões dos seus processos.
        </p>
      </div>

      <div role="search">
        <label htmlFor={searchId} className="sr-only">
          Buscar processo por número, tribunal ou assunto
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2 text-brand-strong" aria-hidden="true" />
          <Input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar processo..."
            autoComplete="off"
            className="h-11 rounded-lg border-input bg-white pl-10 text-[0.95rem] shadow-xs"
          />
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {query ? `${filtered.length} processo(s) encontrado(s).` : ""}
      </p>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-dashed border-neutral-border bg-white px-4 py-6 text-center text-sm text-muted-foreground">
          Nenhum processo encontrado para “{query}”.
        </p>
      ) : (
        <ul className="flex flex-col gap-2.5">
          {filtered.map((item) => {
            const active = item.id === activeId;
            return (
              <li key={item.id}>
                <Link
                  href={`/processos/${item.id}`}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl border bg-white p-3.5 transition-all duration-150",
                    "hover:border-brand/40 hover:shadow-sm",
                    active
                      ? "border-brand bg-brand-softer shadow-sm ring-1 ring-brand"
                      : "border-border",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-lg",
                      active ? "bg-brand text-white" : "bg-brand-soft text-brand-strong",
                    )}
                  >
                    <ProcessIcon area={item.area} className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="font-heading block text-[1.05rem] leading-tight font-bold text-foreground">
                      {item.title}
                    </span>
                    <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.82rem] text-muted-foreground">
                      {item.court}
                      <StatusBadge item={item} />
                    </span>
                    <span className="block text-[0.82rem] font-medium tabular-nums break-all text-foreground/85">
                      {item.number}
                    </span>
                  </span>
                  <ChevronRight
                    className={cn(
                      "size-5 shrink-0 transition-transform group-hover:translate-x-0.5",
                      active ? "text-brand" : "text-muted-foreground",
                    )}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/** Barra lateral fixa (desktop). */
export function ProcessSidebar({ items }: { items: ProcessListItem[] }) {
  return (
    <aside
      aria-label="Meus processos"
      className="hidden w-[22rem] shrink-0 border-r border-border bg-gradient-to-b from-surface to-white lg:block xl:w-[24rem]"
    >
      <div className="sticky top-0 max-h-dvh overflow-y-auto px-6 py-8">
        <ProcessList items={items} />
      </div>
    </aside>
  );
}

/** Painel recolhível para telas menores. */
export function MobileProcessNav({ items }: { items: ProcessListItem[] }) {
  const [open, setOpen] = useState(false);
  const activeId = useActiveProcessId();
  const active = items.find((i) => i.id === activeId);

  return (
    <div className="border-b border-border bg-surface px-4 py-2.5 lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="flex w-full items-center gap-3 rounded-lg border border-border bg-white px-3 py-2 text-left shadow-xs transition-colors hover:border-brand/40">
          <FolderOpen className="size-5 shrink-0 text-brand" aria-hidden="true" />
          <span className="min-w-0 flex-1">
            <span className="block text-xs text-muted-foreground">Meus processos · {items.length}</span>
            <span className="block truncate text-sm font-semibold">
              {active ? `${active.title} · ${active.court}` : "Escolher processo"}
            </span>
          </span>
          <span className="shrink-0 text-sm font-semibold text-brand">Trocar</span>
        </SheetTrigger>
        <SheetContent side="left" className="w-[88vw] max-w-sm overflow-y-auto bg-surface p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Meus processos</SheetTitle>
            <SheetDescription>Escolha um processo para ver a explicação da decisão.</SheetDescription>
          </SheetHeader>
          <div className="px-5 pt-10 pb-6">
            <ProcessList items={items} onNavigate={() => setOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
