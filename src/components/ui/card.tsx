import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
}

export function Card({ children, className, as: Tag = "div" }: CardProps) {
  return (
    <Tag className={cn("bg-ivory border border-charcoal/5 overflow-hidden", className)}>
      {children}
    </Tag>
  );
}

export function CardImage({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("relative overflow-hidden", className)}>{children}</div>;
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("p-6", className)}>{children}</div>;
}
