import { MobileDisclosure } from "@/components/mobile-disclosure";
import type { Process } from "@/lib/types";
import { cn } from "@/lib/utils";

function Item({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <dl className={className}>
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 text-[0.92rem] leading-snug font-semibold text-foreground">{children}</dd>
    </dl>
  );
}

// Mesmo desenho do antigo `divide-x`: linha à direita da coluna, recuo na seguinte.
const dividerAfter = "md:border-r md:border-border";
const indent = "md:pl-6";

export function ProcessMetadata({ process }: { process: Process }) {
  return (
    <section aria-labelledby="dados-processo" className="rounded-xl border border-border bg-surface px-4 py-3.5 sm:px-5">
      <h2 id="dados-processo" className="sr-only">
        Dados do processo
      </h2>
      {/* No celular, Classe e Partes ficam em "Mais detalhes"; a partir de md, a grade mostra tudo. */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-[minmax(0,1.3fr)_repeat(2,minmax(0,1fr))]">
        <Item label="Processo" className={cn("col-span-2 md:col-span-1", dividerAfter)}>
          <span className="tabular-nums break-all">{process.number}</span>
        </Item>
        <Item label="Tribunal" className={cn("col-span-2 md:col-span-1", dividerAfter, indent)}>
          {process.court}
        </Item>
        <MobileDisclosure
          openLabel="Mais detalhes"
          closeLabel="Menos detalhes"
          className="col-span-2 -mt-2 md:contents"
          contentClassName="flex flex-col gap-3 md:contents"
        >
          <Item label="Classe" className={indent}>
            {process.className}
          </Item>
          <Item label="Partes" className="border-t border-border pt-3 md:col-span-3">
            {process.parties.map((party, i) => (
              <span key={party.name}>
                {i > 0 && <span className="px-1.5 font-normal text-muted-foreground">x</span>}
                {party.name}
                <span className="font-normal text-muted-foreground"> ({party.roleLabel})</span>
              </span>
            ))}
          </Item>
        </MobileDisclosure>
      </div>
    </section>
  );
}
