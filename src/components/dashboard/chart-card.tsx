interface ChartCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  /** Mesmos dados do gráfico em tabela (alternativa para leitores de tela e conferência). */
  table: { headers: string[]; rows: (string | number)[][] };
  className?: string;
}

export function ChartCard({ title, description, children, table, className }: ChartCardProps) {
  return (
    <section className={`flex flex-col gap-3 rounded-xl border border-border bg-white p-4 shadow-xs sm:p-5 ${className ?? ""}`}>
      <div>
        <h3 className="font-heading text-[1.15rem] leading-tight font-bold text-brand-strong">{title}</h3>
        {description && <p className="mt-0.5 text-sm leading-snug text-muted-foreground">{description}</p>}
      </div>
      {children}
      <details className="text-sm">
        <summary className="inline-flex min-h-11 cursor-pointer items-center font-semibold text-brand underline underline-offset-4">
          Ver dados em tabela
        </summary>
        <div className="mt-1 overflow-x-auto">
          <table className="w-full min-w-64 border-collapse text-left">
            <thead>
              <tr>
                {table.headers.map((h) => (
                  <th key={h} scope="col" className="border-b border-border px-2 py-1.5 font-semibold text-muted-foreground">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="border-b border-border/60 px-2 py-1.5 tabular-nums">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </section>
  );
}
