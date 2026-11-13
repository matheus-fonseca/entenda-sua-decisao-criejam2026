import { ManagerHeader } from "@/components/manager-header";

export default function GestaoLayout({ children }: LayoutProps<"/gestao">) {
  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <ManagerHeader />
      {children}
    </div>
  );
}
