import Link from "next/link";
import { Fragment, type ReactNode } from "react";

/**
 * Renders FAQ answers with light rich text:
 * - **bold**
 * - [label](/path) or [label](https://...)
 */
export function FaqRichText({ text }: { text: string }) {
  const nodes = parseRichText(text);
  return (
    <span className="[&_a]:text-emerald-800 [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-emerald-800/30 hover:[&_a]:decoration-emerald-800">
      {nodes}
    </span>
  );
}

function parseRichText(input: string): ReactNode[] {
  // Split into tokens: bold, links, or plain
  const pattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  const parts = input.split(pattern).filter(Boolean);

  return parts.map((part, i) => {
    const bold = part.match(/^\*\*(.+)\*\*$/);
    if (bold) {
      return (
        <strong key={i} className="font-medium text-charcoal/90">
          {bold[1]}
        </strong>
      );
    }

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      const external = href.startsWith("http");
      if (external) {
        return (
          <a key={i} href={href} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        );
      }
      return (
        <Link key={i} href={href}>
          {label}
        </Link>
      );
    }

    return <Fragment key={i}>{part}</Fragment>;
  });
}
