"use client";

import { cn } from "@/lib/utils";

interface StaticGraphProps {
  className?: string;
  variant?: "default" | "compact";
}

const nodes = [
  { id: "A", cx: 40, cy: 52, r: 8 },
  { id: "B", cx: 80, cy: 28, r: 7 },
  { id: "C", cx: 134, cy: 38, r: 9 },
  { id: "D", cx: 112, cy: 92, r: 7 },
  { id: "E", cx: 170, cy: 110, r: 10 },
  { id: "F", cx: 62, cy: 112, r: 6 },
  { id: "G", cx: 100, cy: 150, r: 7 },
  { id: "H", cx: 38, cy: 152, r: 9 },
];

const edges: Array<{ from: number; to: number; emphasis?: boolean }> = [
  { from: 0, to: 1 },
  { from: 1, to: 2, emphasis: true },
  { from: 0, to: 5 },
  { from: 5, to: 7 },
  { from: 7, to: 6 },
  { from: 6, to: 4, emphasis: true },
  { from: 4, to: 3 },
  { from: 3, to: 2 },
  { from: 1, to: 3, emphasis: true },
  { from: 0, to: 3 },
];

export function StaticGraph({ className, variant = "default" }: StaticGraphProps) {
  const paddingClass = variant === "compact" ? "p-4" : "p-6";

  return (
    <figure
      className={cn(
        "relative isolate aspect-square w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100 shadow-sm",
        paddingClass,
        className,
      )}
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(59,130,246,0.18),transparent_55%),radial-gradient(circle_at_85%_95%,rgba(14,165,233,0.2),transparent_40%)]"
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 200 200"
        className="relative h-full w-full text-slate-400"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="edge-highlight" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(14 165 233)" stopOpacity="0.2" />
            <stop offset="50%" stopColor="rgb(37 99 235)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="rgb(15 118 110)" stopOpacity="0.8" />
          </linearGradient>
          <radialGradient id="node-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgb(255 255 255)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="rgb(148 163 184)" stopOpacity="0.9" />
          </radialGradient>
        </defs>

        <g opacity="0.2">
          {Array.from({ length: 8 }).map((_, row) => (
            <g key={row}>
              <line x1="0" x2="200" y1={25 * (row + 1)} y2={25 * (row + 1)} stroke="currentColor" strokeWidth="0.5" />
            </g>
          ))}
          {Array.from({ length: 8 }).map((_, col) => (
            <g key={col}>
              <line y1="0" y2="200" x1={25 * (col + 1)} x2={25 * (col + 1)} stroke="currentColor" strokeWidth="0.5" />
            </g>
          ))}
        </g>

        {edges.map((edge, index) => {
          const from = nodes[edge.from];
          const to = nodes[edge.to];
          return (
            <line
              key={`${from.id}-${to.id}-${index}`}
              x1={from.cx}
              y1={from.cy}
              x2={to.cx}
              y2={to.cy}
              stroke={edge.emphasis ? "url(#edge-highlight)" : "rgba(100,116,139,0.45)"}
              strokeWidth={edge.emphasis ? 3 : 2}
              strokeLinecap="round"
              strokeDasharray={edge.emphasis ? undefined : "6 6"}
            />
          );
        })}

        {nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.cx}
              cy={node.cy}
              r={node.r + 4}
              fill="rgba(148,163,184,0.22)"
            />
            <circle cx={node.cx} cy={node.cy} r={node.r} fill="url(#node-core)" stroke="rgba(51,65,85,0.35)" strokeWidth="1.5" />
            <text
              x={node.cx}
              y={node.cy + 4}
              fontSize="9"
              textAnchor="middle"
              fill="rgb(51,65,85)"
              fontFamily="var(--font-geist-mono), ui-monospace"
            >
              {node.id}
            </text>
          </g>
        ))}
      </svg>

      <figcaption className="sr-only">
        Static network diagram showing research focus clusters.
      </figcaption>
    </figure>
  );
}
