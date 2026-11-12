import type { Metadata, Viewport } from "next";
import { Barlow_Semi_Condensed, Noto_Sans } from "next/font/google";
import "./globals.css";

const bodyFont = Noto_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const titleFont = Barlow_Semi_Condensed({
  variable: "--font-title",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Explica.AI (protótipo)",
    template: "%s · Explica.AI (protótipo)",
  },
  description:
    "Protótipo ilustrativo que explica sentenças e acórdãos em linguagem simples. Todos os dados são fictícios.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0c2a5c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${bodyFont.variable} ${titleFont.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}
