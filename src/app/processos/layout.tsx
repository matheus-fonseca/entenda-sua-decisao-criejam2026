import { AppHeader } from "@/components/app-header";
import { FirstAccessGate } from "@/components/first-access-gate";
import { getProcessListItems } from "@/lib/processes";

export default function ProcessosLayout({ children }: LayoutProps<"/processos">) {
  const titles = getProcessListItems().map((item) => item.title);

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <AppHeader />
      <FirstAccessGate processTitles={titles}>{children}</FirstAccessGate>
    </div>
  );
}
