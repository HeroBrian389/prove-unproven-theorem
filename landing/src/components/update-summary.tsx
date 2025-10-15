import Link from "next/link";
import { Fragment } from "react";

import { UpdateSummaryNode } from "@/types/update";

interface UpdateSummaryProps {
  summary: UpdateSummaryNode[];
}

export function UpdateSummary({ summary }: UpdateSummaryProps) {
  return (
    <>
      {summary.map((node, index) => {
        if (node.type === "text") {
          return <Fragment key={`${index}-text`}>{node.text}</Fragment>;
        }

        const { href, text, isExternal = false } = node;

        if (isExternal) {
          return (
            <a
              key={`${index}-link`}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-sky-700 underline decoration-sky-200 underline-offset-4 transition hover:text-sky-900"
            >
              {text}
            </a>
          );
        }

        return (
          <Link
            key={`${index}-link`}
            href={href}
            className="text-sky-700 underline decoration-sky-200 underline-offset-4 transition hover:text-sky-900"
          >
            {text}
          </Link>
        );
      })}
    </>
  );
}
