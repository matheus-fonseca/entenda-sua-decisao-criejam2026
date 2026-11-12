import { MobileProcessNav, ProcessSidebar } from "@/components/process-sidebar";
import { getProcessListItems } from "@/lib/processes";

export default function ProcessLayout({ children }: LayoutProps<"/processos/[id]">) {
  const items = getProcessListItems();
  return (
    <div className="flex flex-1">
      <ProcessSidebar items={items} />
      <div className="flex min-w-0 flex-1 flex-col">
        <MobileProcessNav items={items} />
        {children}
      </div>
    </div>
  );
}
