import { Gavel, Scale, ShieldCheck, type LucideIcon } from "lucide-react";
import type { ProcessArea } from "@/lib/types";

const icons: Record<ProcessArea, LucideIcon> = {
  trabalhista: Gavel,
  previdenciario: ShieldCheck,
  civel: Scale,
};

export function ProcessIcon({ area, className }: { area: ProcessArea; className?: string }) {
  const Icon = icons[area];
  return <Icon className={className} aria-hidden="true" />;
}
