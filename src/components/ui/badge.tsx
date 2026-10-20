import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "sand" | "heritage" | "outline";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase",
        variant === "default" && "bg-emerald-800 text-ivory",
        variant === "sand" && "bg-sand-400 text-charcoal",
        variant === "heritage" && "bg-heritage-500 text-ivory",
        variant === "outline" && "border border-charcoal/20 text-charcoal",
        className
      )}
    >
      {children}
    </span>
  );
}
