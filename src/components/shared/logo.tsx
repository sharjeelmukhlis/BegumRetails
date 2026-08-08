import Link from "next/link";
import { cn } from "@/lib/utils";

export const BEGUM_ICON = "/Begum-Icon.svg";
export const BEGUM_ICON_DARK = "/Begum-Icon-Dark.svg";
export const BEGUM_FAVICON = "/Favicon.svg";

/** Gold mark on dark surfaces · emerald mark on light surfaces */
export type LogoTheme = "on-dark" | "on-light";

const iconHeights = {
  sm: 28,
  md: 34,
  lg: 44,
  xl: 56,
} as const;

const wordmarkSizes = {
  sm: "text-xl",
  md: "text-[1.65rem] md:text-3xl",
  lg: "text-3xl",
  xl: "text-4xl",
} as const;

const themeStyles: Record<
  LogoTheme,
  { wordmark: string; iconLight: string; iconDark: string }
> = {
  "on-dark": {
    wordmark: "text-ivory",
    iconLight: "opacity-100",
    iconDark: "opacity-0",
  },
  "on-light": {
    wordmark: "text-emerald-800",
    iconLight: "opacity-0",
    iconDark: "opacity-100",
  },
};

interface LogoProps {
  variant?: "full" | "icon";
  theme?: LogoTheme;
  size?: keyof typeof iconHeights;
  className?: string;
  wordmarkClassName?: string;
  href?: string | false;
  onClick?: () => void;
}

function iconWidth(height: number) {
  return Math.round(height * (468 / 505));
}

function LogoIcon({
  height,
  theme,
  variant,
}: {
  height: number;
  theme: LogoTheme;
  variant: "full" | "icon";
}) {
  const width = iconWidth(height);
  const styles = themeStyles[theme];

  return (
    <span
      className="relative shrink-0 inline-block"
      style={{ width, height }}
      aria-hidden={variant === "full"}
    >
      <img
        src={BEGUM_ICON}
        alt={variant === "icon" ? "Begum" : ""}
        width={width}
        height={height}
        className={cn(
          "absolute inset-0 h-full w-full object-contain transition-opacity duration-400",
          styles.iconLight,
        )}
      />
      <img
        src={BEGUM_ICON_DARK}
        alt=""
        width={width}
        height={height}
        className={cn(
          "absolute inset-0 h-full w-full object-contain transition-opacity duration-400",
          styles.iconDark,
        )}
        aria-hidden
      />
    </span>
  );
}

export function BrandMark({
  size = 48,
  theme = "on-light",
  className,
  alt = "Begum",
}: {
  size?: number;
  theme?: LogoTheme;
  className?: string;
  alt?: string;
}) {
  const decorative = alt === "";
  const styles = themeStyles[theme];
  const width = iconWidth(size);

  return (
    <span
      className={cn("relative inline-block", className)}
      style={{ width, height: size }}
    >
      <img
        src={BEGUM_ICON}
        alt={decorative ? "" : alt}
        width={width}
        height={size}
        className={cn(
          "absolute inset-0 h-full w-full object-contain transition-opacity duration-400",
          styles.iconLight,
        )}
        aria-hidden={decorative || undefined}
      />
      <img
        src={BEGUM_ICON_DARK}
        alt=""
        width={width}
        height={size}
        className={cn(
          "absolute inset-0 h-full w-full object-contain transition-opacity duration-400",
          styles.iconDark,
        )}
        aria-hidden
      />
    </span>
  );
}

export function Logo({
  variant = "full",
  theme = "on-light",
  size = "md",
  className,
  wordmarkClassName,
  href = "/",
  onClick,
}: LogoProps) {
  const height = iconHeights[size];
  const styles = themeStyles[theme];

  const content = (
    <span className={cn("inline-flex items-center gap-2.5 shrink-0", className)}>
      <LogoIcon height={height} theme={theme} variant={variant} />
      {variant === "full" && (
        <span
          className={cn(
            "font-display tracking-tight leading-none transition-colors duration-400",
            wordmarkSizes[size],
            wordmarkClassName ?? styles.wordmark,
          )}
        >
          Begum
        </span>
      )}
    </span>
  );

  if (href === false) return content;

  return (
    <Link
      href={href}
      onClick={onClick}
      className="inline-flex transition-opacity hover:opacity-90"
      aria-label="Begum home"
    >
      {content}
    </Link>
  );
}
