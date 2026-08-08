import { cn } from "@/lib/utils";

export function PageShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden pt-28 pb-24 md:pt-32", className)}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_12%,rgba(6,35,25,0.05),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_86%_70%,rgba(201,151,90,0.08),transparent_50%)]" />
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sand-300/45 to-transparent" />
      {children}
    </div>
  );
}
