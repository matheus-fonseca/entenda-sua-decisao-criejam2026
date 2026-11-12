import type { LucideIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export interface ExplanationItem {
  id: string;
  title: string;
  icon: LucideIcon;
  content: React.ReactNode;
}

/** Seções expansíveis, todas abertas por padrão e recolhíveis individualmente. */
export function ExplanationSection({ items, className }: { items: ExplanationItem[]; className?: string }) {
  return (
    <Accordion
      type="multiple"
      defaultValue={items.map((item) => item.id)}
      className={cn("grid gap-4 md:grid-cols-2", className)}
    >
      {items.map(({ id, title, icon: Icon, content }) => (
        <AccordionItem
          key={id}
          value={id}
          className="self-start rounded-xl border border-border bg-white shadow-xs transition-shadow not-last:border-b hover:shadow-sm"
        >
          <AccordionTrigger className="items-center gap-3 rounded-xl px-4 py-3.5 hover:no-underline sm:px-5 [&_[data-slot=accordion-trigger-icon]]:size-5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <span className="font-heading flex-1 text-[1.2rem] leading-tight font-bold text-brand-strong">
              {title}
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 text-[0.98rem] leading-relaxed text-foreground sm:px-5 sm:pl-[4.25rem]">
            {content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

/** Lista de frases curtas usada dentro das seções. */
export function SentenceList({ sentences }: { sentences: string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {sentences.map((sentence) => (
        <li key={sentence} className="flex gap-2.5">
          <span aria-hidden="true" className="mt-[0.6rem] size-1.5 shrink-0 rounded-full bg-brand/60" />
          <span>{sentence}</span>
        </li>
      ))}
    </ul>
  );
}
