import type { Metadata } from "next";
import { NotificationSettingsCard } from "@/components/notification-settings-card";
import { ProcessList } from "@/components/process-sidebar";
import { PrototypeBadge } from "@/components/prototype-badge";
import { getProcessListItems } from "@/lib/processes";

export const metadata: Metadata = { title: "Meus processos" };

export default function ProcessosPage() {
  return (
    <main id="conteudo" className="flex-1 bg-gradient-to-b from-surface to-white">
      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        <ProcessList items={getProcessListItems()} headingLevel="h1" />
        <NotificationSettingsCard />
        <div className="mt-8 flex justify-center">
          <PrototypeBadge />
        </div>
      </div>
    </main>
  );
}
