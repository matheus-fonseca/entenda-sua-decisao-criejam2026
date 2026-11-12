import { cn } from "@/lib/utils";

/** Ilustração simples e genérica de avatar (não representa pessoa real). */
export function AvatarIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn("shrink-0", className)}>
      <circle cx="32" cy="32" r="32" fill="#dbe7fb" />
      <path d="M12 60c2-11 10-17 20-17s18 6 20 17a32 32 0 0 1-40 0Z" fill="#1351b4" />
      <path d="M26 41h12v6a6 6 0 0 1-12 0Z" fill="#b97a52" />
      <path d="M18 30c0-11 6-18 14-18s14 7 14 18c0 6-1 10-3 13H21c-2-3-3-7-3-13Z" fill="#2b1d14" />
      <ellipse cx="32" cy="30" rx="10" ry="12" fill="#c98b5f" />
      <path d="M21 26c3-8 8-10 11-10 5 0 10 3 11 10-6-1-11-4-13-7-2 4-5 6-9 7Z" fill="#2b1d14" />
      <circle cx="28" cy="30" r="1.4" fill="#2b1d14" />
      <circle cx="36" cy="30" r="1.4" fill="#2b1d14" />
      <path d="M28.5 35.5c2 1.6 5 1.6 7 0" stroke="#7a3f25" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}
