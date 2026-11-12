import type { Process } from "@/lib/types";

function Item({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 text-[0.92rem] leading-snug font-semibold text-foreground">{children}</dd>
    </div>
  );
}

export function ProcessMetadata({ process }: { process: Process }) {
  return (
    <section aria-labelledby="dados-processo" className="rounded-xl border border-border bg-surface px-4 py-3.5 sm:px-5">
      <h2 id="dados-processo" className="sr-only">
        Dados do processo
      </h2>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-[minmax(0,1.3fr)_repeat(2,minmax(0,1fr))] md:divide-x md:divide-border md:[&>div:not(:first-child)]:pl-6">
        <Item label="Processo" className="col-span-2 md:col-span-1">
          <span className="tabular-nums break-all">{process.number}</span>
        </Item>
        <Item label="Tribunal">{process.court}</Item>
        <Item label="Classe">{process.className}</Item>
      </dl>
      <dl className="mt-3 border-t border-border pt-3">
        <Item label="Partes">
          {process.parties.map((party, i) => (
            <span key={party.name}>
              {i > 0 && <span className="px-1.5 font-normal text-muted-foreground">x</span>}
              {party.name}
              <span className="font-normal text-muted-foreground"> ({party.roleLabel})</span>
            </span>
          ))}
        </Item>
      </dl>
    </section>
  );
}
