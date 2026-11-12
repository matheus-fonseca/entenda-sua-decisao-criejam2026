import { AppHeader } from "@/components/app-header";

export default function ProcessosLayout({ children }: LayoutProps<"/processos">) {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <AppHeader />
      {children}
    </div>
  );
}
