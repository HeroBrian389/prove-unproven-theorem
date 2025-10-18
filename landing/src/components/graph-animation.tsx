"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  FocusEvent as ReactFocusEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import { motion } from "framer-motion";

type NodeDefinition = {
  id: string;
  radius: number;
};

type NodeState = {
  id: string;
  radius: number;
  x: number;
  y: number;
  visible: boolean;
  label: string;
  description: string;
};

type TooltipContent = {
  label: string;
  description: string;
  source: "card" | "node";
};

type TemplateNode = {
  x: number;
  y: number;
  visible?: boolean;
  radiusScale?: number;
  label?: string;
  description?: string;
};

type TemplateEdge = {
  from: string;
  to: string;
  weight?: number;
  dashed?: boolean;
};

type GraphTemplate = {
  name: string;
  nodes: Partial<Record<string, TemplateNode>>;
  edges: TemplateEdge[];
};

type EdgeState = {
  id: string;
  from: string;
  to: string;
  weight: number;
  dashed: boolean;
};

const nodeDefinitions: NodeDefinition[] = [
  { id: "a", radius: 3.6 },
  { id: "b", radius: 2.8 },
  { id: "c", radius: 3.1 },
  { id: "d", radius: 2.4 },
  { id: "e", radius: 4.1 },
  { id: "f", radius: 2.9 },
  { id: "g", radius: 2.6 },
  { id: "h", radius: 3.0 },
];

const randomInRange = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const createRadialNodes = (
  ids: string[],
  radius: number,
  rotation = 0,
  center: { x: number; y: number } = { x: 50, y: 50 }
) => {
  const step = (Math.PI * 2) / ids.length;
  const record: Record<string, TemplateNode> = {};

  ids.forEach((id, index) => {
    const angle = rotation + step * index;
    record[id] = {
      x: +(center.x + Math.cos(angle) * radius).toFixed(2),
      y: +(center.y + Math.sin(angle) * radius).toFixed(2),
    };
  });

  return record;
};

const mergeNodeMeta = (
  nodes: Record<string, TemplateNode>,
  meta: Partial<Record<string, Partial<TemplateNode>>>
) => {
  const next: Record<string, TemplateNode> = { ...nodes };

  Object.entries(meta).forEach(([id, data]) => {
    const base = next[id] ?? { x: 50, y: 50 };
    next[id] = { ...base, ...data };
  });

  return next;
};

const graphTemplates: GraphTemplate[] = [
  {
    name: "ring",
    nodes: (() => {
      const base = createRadialNodes(["a", "b", "c", "d", "e", "f", "g", "h"], 30, Math.PI / 8);
      return mergeNodeMeta(base, {
        a: {
          label: "a",
          description: "Entrance vertex on the ring; anchors one of the chord highlights.",
        },
        b: {
          label: "b",
          description: "Cycle step that keeps the ring balanced between two neighbors.",
        },
        c: {
          label: "c",
          description: "Marks the chord crossing toward g, hinting at alternate paths.",
        },
        d: {
          label: "d",
          description: "Quarter-turn vertex closing the upper arc of the cycle.",
        },
        e: {
          label: "e",
          description: "Opposite anchor to a; carries the second chord highlight toward a.",
        },
        f: {
          label: "f",
          description: "Lower-right bridge that continues the clockwise traversal.",
        },
        g: {
          label: "g",
          description: "Receives the dashed chord from c, forming a shortcut across the ring.",
        },
        h: {
          label: "h",
          description: "Final ring vertex joining back to a to complete the circuit.",
        },
      });
    })(),
    edges: [
      { from: "a", to: "b" },
      { from: "b", to: "c" },
      { from: "c", to: "d" },
      { from: "d", to: "e" },
      { from: "e", to: "f" },
      { from: "f", to: "g" },
      { from: "g", to: "h" },
      { from: "h", to: "a" },
      { from: "a", to: "e", dashed: true },
      { from: "c", to: "g", dashed: true },
    ],
  },
  {
    name: "star",
    nodes: {
      ...(() => {
        const base = createRadialNodes(["a", "b", "c", "d", "f", "g", "h"], 28, Math.PI / 7);
        return mergeNodeMeta(base, {
          a: {
            label: "leaf a",
            description: "Outer node a receiving a spoke from the hub.",
          },
          b: {
            label: "leaf b",
            description: "Outer node b illustrating the star's symmetry.",
          },
          c: {
            label: "leaf c",
            description: "Outer node tied into a dashed triangle of alternate routes.",
          },
          d: {
            label: "leaf d",
            description: "Outer node d demonstrating even spoke distribution.",
          },
          f: {
            label: "leaf f",
            description: "Outer node f closing the dashed alternate triangle.",
          },
          g: {
            label: "leaf g",
            description: "Outer node displaying a standard spoke from the hub.",
          },
          h: {
            label: "leaf h",
            description: "Outer node h finishing the circular arrangement of leaves.",
          },
        });
      })(),
      e: {
        x: 50,
        y: 50,
        radiusScale: 1.1,
        label: "hub e",
        description: "Central hub connecting to every leaf, forming a star graph.",
      },
    },
    edges: [
      { from: "e", to: "a", weight: 1.1 },
      { from: "e", to: "b", weight: 1.1 },
      { from: "e", to: "c", weight: 1.1 },
      { from: "e", to: "d", weight: 1.1 },
      { from: "e", to: "f", weight: 1.1 },
      { from: "e", to: "g", weight: 1.1 },
      { from: "e", to: "h", weight: 1.1 },
      { from: "a", to: "c", dashed: true },
      { from: "c", to: "f", dashed: true },
      { from: "f", to: "a", dashed: true },
    ],
  },
  {
    name: "ladder",
    nodes: {
      a: {
        x: 26,
        y: 32,
        label: "rung a",
        description: "Top-left rung starting the ladder path.",
      },
      b: {
        x: 42,
        y: 32,
        label: "rung b",
        description: "Top lane vertex b linking the first square.",
      },
      c: {
        x: 58,
        y: 32,
        label: "rung c",
        description: "Top lane vertex c crossing to the lower rail via dashed diagonal.",
      },
      d: {
        x: 74,
        y: 32,
        label: "rung d",
        description: "Top-right rung finishing the upper rail.",
      },
      e: {
        x: 26,
        y: 68,
        label: "rung e",
        description: "Bottom-left rung forming the first vertical edge.",
      },
      f: {
        x: 42,
        y: 68,
        label: "rung f",
        description: "Bottom lane vertex f aligning with the top row square.",
      },
      g: {
        x: 58,
        y: 68,
        label: "rung g",
        description: "Bottom lane vertex g connecting the middle square.",
      },
      h: {
        x: 74,
        y: 68,
        label: "rung h",
        description: "Bottom-right rung closing the ladder.",
      },
    },
    edges: [
      { from: "a", to: "b" },
      { from: "b", to: "c" },
      { from: "c", to: "d" },
      { from: "e", to: "f" },
      { from: "f", to: "g" },
      { from: "g", to: "h" },
      { from: "a", to: "e", weight: 1.1 },
      { from: "b", to: "f" },
      { from: "c", to: "g" },
      { from: "d", to: "h", weight: 1.1 },
      { from: "b", to: "e", dashed: true },
      { from: "c", to: "h", dashed: true },
    ],
  },
  {
    name: "twin-triangle",
    nodes: {
      a: {
        x: 26,
        y: 38,
        label: "triangle a",
        description: "Vertex a of the left triangle, linking into the central hinge.",
      },
      b: {
        x: 38,
        y: 24,
        label: "triangle b",
        description: "Upper vertex b, shared with the left triangle's apex.",
      },
      c: {
        x: 38,
        y: 52,
        label: "triangle c",
        description: "Lower vertex c completing the left triangle.",
      },
      d: {
        x: 50,
        y: 38,
        label: "hinge d",
        description: "Central hinge connecting both triangles and the bridge to e.",
      },
      e: {
        x: 62,
        y: 38,
        label: "triangle e",
        description: "Entry vertex into the right triangle and lower extension.",
      },
      f: {
        x: 74,
        y: 24,
        label: "triangle f",
        description: "Upper-right vertex illustrating the mirrored triangle.",
      },
      g: {
        x: 74,
        y: 52,
        label: "triangle g",
        description: "Lower-right vertex balancing the mirrored triangle.",
      },
      h: {
        x: 62,
        y: 66,
        label: "tail h",
        description: "Tail vertex hanging from the right triangle's base.",
      },
    },
    edges: [
      { from: "a", to: "b" },
      { from: "b", to: "c" },
      { from: "c", to: "a" },
      { from: "d", to: "a", weight: 1.05 },
      { from: "d", to: "b", weight: 1.05 },
      { from: "d", to: "c", weight: 1.05 },
      { from: "d", to: "e", weight: 1.15 },
      { from: "e", to: "f" },
      { from: "e", to: "g" },
      { from: "f", to: "g" },
      { from: "e", to: "h" },
      { from: "g", to: "h" },
    ],
  },
  {
    name: "chain",
    nodes: {
      a: {
        x: 20,
        y: 50,
        label: "anchor a",
        description: "Anchor node starting the zig-zag chain.",
      },
      b: {
        x: 32,
        y: 34,
        label: "bend b",
        description: "Upper bend b turning the chain upward.",
      },
      c: {
        x: 44,
        y: 50,
        label: "pivot c",
        description: "Central pivot c where alternate dashed chords appear.",
      },
      d: {
        x: 56,
        y: 34,
        label: "bend d",
        description: "Second upward bend keeping the pattern consistent.",
      },
      e: {
        x: 68,
        y: 50,
        label: "anchor e",
        description: "Right anchor e tying into the lower chords.",
      },
      f: {
        x: 80,
        y: 34,
        label: "end f",
        description: "Final bend of the chain reaching the far right.",
      },
      g: {
        x: 56,
        y: 66,
        label: "lower g",
        description: "Lower node g forming a supporting triangle with c and e.",
      },
      h: {
        x: 32,
        y: 66,
        label: "lower h",
        description: "Lower node h mirroring g on the left side.",
      },
    },
    edges: [
      { from: "a", to: "b" },
      { from: "b", to: "c" },
      { from: "c", to: "d" },
      { from: "d", to: "e" },
      { from: "e", to: "f" },
      { from: "c", to: "h", dashed: true },
      { from: "c", to: "g", dashed: true },
      { from: "g", to: "e", weight: 1.05 },
      { from: "h", to: "a", weight: 1.05 },
    ],
  },
  {
    name: "wheel",
    nodes: {
      ...(() => {
        const base = createRadialNodes(["a", "b", "c", "d", "f", "g", "h"], 26, Math.PI / 6);
        return mergeNodeMeta(base, {
          a: {
            label: "rim a",
            description: "Rim vertex a starting the circular boundary of the wheel.",
          },
          b: {
            label: "rim b",
            description: "Rim vertex b on the upper arc of the wheel.",
          },
          c: {
            label: "rim c",
            description: "Rim vertex c leading toward the first diagonal chord.",
          },
          d: {
            label: "rim d",
            description: "Rim vertex d continuing the circumference.",
          },
          f: {
            label: "rim f",
            description: "Rim vertex f opposite the top rim, closing the lower arc.",
          },
          g: {
            label: "rim g",
            description: "Rim vertex g demonstrating the radial spoke pattern.",
          },
          h: {
            label: "rim h",
            description: "Rim vertex h completing the cycle back to a.",
          },
        });
      })(),
      e: {
        x: 50,
        y: 50,
        radiusScale: 1.15,
        label: "hub e",
        description: "Central hub of the wheel graph connecting every rim vertex.",
      },
    },
    edges: [
      { from: "a", to: "b" },
      { from: "b", to: "c" },
      { from: "c", to: "d" },
      { from: "d", to: "f" },
      { from: "f", to: "g" },
      { from: "g", to: "h" },
      { from: "h", to: "a" },
      { from: "e", to: "a", weight: 1.1 },
      { from: "e", to: "b", weight: 1.1 },
      { from: "e", to: "c", weight: 1.1 },
      { from: "e", to: "d", weight: 1.1 },
      { from: "e", to: "f", weight: 1.1 },
      { from: "e", to: "g", weight: 1.1 },
      { from: "e", to: "h", weight: 1.1 },
      { from: "b", to: "f", dashed: true },
      { from: "d", to: "h", dashed: true },
    ],
  },
  {
    name: "bipartite",
    nodes: {
      a: {
        x: 26,
        y: 30,
        label: "left a",
        description: "Left partition vertex a showing a connection into every right node.",
      },
      c: {
        x: 26,
        y: 46,
        label: "left c",
        description: "Left partition vertex c forming the dense bipartite core.",
      },
      e: {
        x: 26,
        y: 62,
        radiusScale: 1.05,
        label: "left e",
        description: "Left partition vertex e with a slight emphasis to mark balance.",
      },
      g: {
        x: 26,
        y: 78,
        label: "left g",
        description: "Left partition vertex g wrapping up the column.",
      },
      b: {
        x: 74,
        y: 30,
        label: "right b",
        description: "Right partition vertex b receiving connections from every left node.",
      },
      d: {
        x: 74,
        y: 46,
        label: "right d",
        description: "Right partition vertex d strengthening the complete bipartite structure.",
      },
      f: {
        x: 74,
        y: 62,
        label: "right f",
        description: "Right partition vertex f balancing the dense cross links.",
      },
      h: {
        x: 74,
        y: 78,
        label: "right h",
        description: "Right partition vertex h closing the opposing column.",
      },
    },
    edges: [
      { from: "a", to: "b" },
      { from: "a", to: "d" },
      { from: "a", to: "f" },
      { from: "a", to: "h", dashed: true },
      { from: "c", to: "b" },
      { from: "c", to: "d" },
      { from: "c", to: "f" },
      { from: "c", to: "h" },
      { from: "e", to: "b" },
      { from: "e", to: "d" },
      { from: "e", to: "f" },
      { from: "e", to: "h" },
      { from: "g", to: "b", dashed: true },
      { from: "g", to: "d" },
      { from: "g", to: "f" },
      { from: "g", to: "h" },
    ],
  },
  {
    name: "branching-tree",
    nodes: {
      e: {
        x: 50,
        y: 22,
        radiusScale: 1.1,
        label: "root e",
        description: "Root vertex feeding the binary-style branching below.",
      },
      c: {
        x: 34,
        y: 38,
        label: "branch c",
        description: "Left branch c splitting toward two child vertices.",
      },
      g: {
        x: 66,
        y: 38,
        label: "branch g",
        description: "Right branch g mirroring the left side of the tree.",
      },
      b: {
        x: 24,
        y: 54,
        label: "leaf b",
        description: "Leaf b on the far left, one hop from branch c.",
      },
      d: {
        x: 44,
        y: 54,
        label: "leaf d",
        description: "Leaf d descending from branch c and sharing the trunk to a.",
      },
      f: {
        x: 56,
        y: 54,
        label: "leaf f",
        description: "Leaf f descending from branch g toward the trunk.",
      },
      h: {
        x: 76,
        y: 54,
        label: "leaf h",
        description: "Leaf h on the far right completing the symmetric branches.",
      },
      a: {
        x: 50,
        y: 72,
        label: "trunk a",
        description: "Shared trunk vertex a where the branches reconverge.",
      },
    },
    edges: [
      { from: "e", to: "c" },
      { from: "e", to: "g" },
      { from: "c", to: "b" },
      { from: "c", to: "d" },
      { from: "g", to: "f" },
      { from: "g", to: "h" },
      { from: "d", to: "a" },
      { from: "f", to: "a" },
      { from: "b", to: "a", dashed: true },
      { from: "h", to: "a", dashed: true },
    ],
  },
  {
    name: "cube",
    nodes: {
      a: {
        x: 28,
        y: 32,
        label: "front a",
        description: "Front-left vertex a of the cube projection.",
      },
      b: {
        x: 46,
        y: 26,
        label: "front b",
        description: "Front-top vertex b joining the visible face.",
      },
      c: {
        x: 66,
        y: 34,
        label: "front c",
        description: "Front-right vertex c outlining the top face.",
      },
      d: {
        x: 48,
        y: 40,
        label: "front d",
        description: "Front-bottom vertex d closing the visible square.",
      },
      e: {
        x: 32,
        y: 68,
        label: "back e",
        description: "Back-left vertex e connected diagonally to the front face.",
      },
      f: {
        x: 50,
        y: 62,
        label: "back f",
        description: "Back-top vertex f illustrating the offset square.",
      },
      g: {
        x: 70,
        y: 70,
        label: "back g",
        description: "Back-right vertex g reinforcing the cube depth illusion.",
      },
      h: {
        x: 52,
        y: 76,
        label: "back h",
        description: "Back-bottom vertex h tying the two squares together.",
      },
    },
    edges: [
      { from: "a", to: "b" },
      { from: "b", to: "c" },
      { from: "c", to: "d" },
      { from: "d", to: "a" },
      { from: "e", to: "f" },
      { from: "f", to: "g" },
      { from: "g", to: "h" },
      { from: "h", to: "e" },
      { from: "a", to: "e" },
      { from: "b", to: "f" },
      { from: "c", to: "g" },
      { from: "d", to: "h" },
      { from: "a", to: "f", dashed: true },
      { from: "b", to: "g", dashed: true },
      { from: "c", to: "h", dashed: true },
    ],
  },
];

const createNodeState = (template: GraphTemplate): NodeState[] =>
  nodeDefinitions.map((definition) => {
    const spec = template.nodes[definition.id];
    const baseLabel = definition.id.toUpperCase();
    const templateName = template.name.replace("-", " ");

    if (!spec) {
      return {
        id: definition.id,
        radius: definition.radius,
        x: 50,
        y: 50,
        visible: false,
        label: baseLabel,
        description: `Vertex ${baseLabel} is hidden in the ${templateName} layout.`,
      } satisfies NodeState;
    }

    const label = spec.label ?? baseLabel;
    const description =
      spec.description ?? `Vertex ${label} inside the ${templateName} layout.`;

    return {
      id: definition.id,
      radius: definition.radius * (spec.radiusScale ?? 1),
      x: spec.x,
      y: spec.y,
      visible: spec.visible ?? true,
      label,
      description,
    } satisfies NodeState;
  });

const createEdgeState = (template: GraphTemplate): EdgeState[] =>
  template.edges.map((edge, index) => ({
    id: `${template.name}-edge-${index}`,
    from: edge.from,
    to: edge.to,
    weight: edge.weight ?? 1,
    dashed: edge.dashed ?? false,
  }));

const graphAnimationPersistence = {
  activeTemplateIndex: 0,
};

export function GraphAnimation() {
  const initialTemplateIndex =
    graphAnimationPersistence.activeTemplateIndex ?? 0;
  const initialTemplate =
    graphTemplates[initialTemplateIndex] ?? graphTemplates[0];

  const [activeTemplateIndex, setActiveTemplateIndex] = useState(
    initialTemplateIndex,
  );
  const [nodes, setNodes] = useState<NodeState[]>(() =>
    createNodeState(initialTemplate),
  );
  const [edges, setEdges] = useState<EdgeState[]>(() =>
    createEdgeState(initialTemplate),
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredNode, setHoveredNode] = useState<TooltipContent | null>(null);
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });
  const [isPointerInside, setIsPointerInside] = useState(false);

  const templateIndexRef = useRef(activeTemplateIndex);

  const updateTooltipPosition = useCallback((event: ReactPointerEvent<Element>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }

    setPointerPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  }, []);

  const focusTooltipForNode = useCallback((node: NodeState) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }

    setPointerPosition({
      x: (node.x / 100) * rect.width,
      y: (node.y / 100) * rect.height,
    });
    setHoveredNode({
      source: "node",
      label: node.label,
      description: node.description,
    });
  }, []);

  const tooltipPosition = useMemo(() => {
    const container = containerRef.current;
    if (!container) {
      return { left: pointerPosition.x + 14, top: pointerPosition.y + 18 };
    }

    const { width, height } = container.getBoundingClientRect();
    const offsetX = 14;
    const offsetY = 18;
    const maxWidth = 220;
    const maxHeight = 120;

    return {
      left: Math.min(Math.max(pointerPosition.x + offsetX, 12), Math.max(width - maxWidth, 12)),
      top: Math.min(Math.max(pointerPosition.y + offsetY, 12), Math.max(height - maxHeight, 12)),
    };
  }, [pointerPosition]);

  const applyTemplate = useCallback((index: number) => {
    const safeIndex = index % graphTemplates.length;
    const template = graphTemplates[safeIndex] ?? graphTemplates[0];
    templateIndexRef.current = safeIndex;
    graphAnimationPersistence.activeTemplateIndex = safeIndex;
    setActiveTemplateIndex(safeIndex);
    setNodes(createNodeState(template));
    setEdges(createEdgeState(template));
    setHoveredNode(null);
  }, []);

  useEffect(() => {
    graphAnimationPersistence.activeTemplateIndex = activeTemplateIndex;
  }, [activeTemplateIndex]);

  useEffect(() => {
    const kickoff = window.setTimeout(() => {
      const nextIndex = (templateIndexRef.current + 1) % graphTemplates.length;
      applyTemplate(nextIndex);
    }, 1200);

    return () => {
      window.clearTimeout(kickoff);
    };
  }, [applyTemplate]);

  useEffect(() => {
    let timeoutId: number | undefined;

    const schedule = () => {
      const delay = randomInRange(4200, 6400);
      timeoutId = window.setTimeout(() => {
        let next = Math.floor(Math.random() * graphTemplates.length);

        if (graphTemplates.length > 1) {
          while (next === templateIndexRef.current) {
            next = Math.floor(Math.random() * graphTemplates.length);
          }
        }

        applyTemplate(next);
        schedule();
      }, delay);
    };

    schedule();

    return () => {
      if (typeof timeoutId === "number") {
        window.clearTimeout(timeoutId);
      }
    };
  }, [applyTemplate]);

  const nodeLookup = useMemo(() => {
    const record: Record<string, NodeState> = {};
    nodes.forEach((node) => {
      record[node.id] = node;
    });
    return record;
  }, [nodes]);

  const activeTemplateName = useMemo(
    () => graphTemplates[activeTemplateIndex]?.name ?? "",
    [activeTemplateIndex]
  );

  const baseTooltip = useMemo<TooltipContent>(() => {
    const readableName = activeTemplateName.replace("-", " ").trim();
    const label = readableName ? `${readableName} layout` : "Graph animation";
    const description = readableName
      ? `Currently showcasing the ${readableName} graph layout. Hover vertices to explore their roles.`
      : "Currently showcasing an animated graph layout. Hover vertices to explore their roles.";
    return {
      source: "card",
      label,
      description,
    };
  }, [activeTemplateName]);

  const ensureDefaultTooltip = useCallback(
    (force = false) => {
      setHoveredNode((current) => {
        if (!force && current?.source === "node") {
          return current;
        }
        if (
          current?.source === "card" &&
          current.label === baseTooltip.label &&
          current.description === baseTooltip.description
        ) {
          return current;
        }
        return baseTooltip;
      });
    },
    [baseTooltip],
  );

  useEffect(() => {
    if (!isPointerInside) {
      return;
    }
    ensureDefaultTooltip();
  }, [ensureDefaultTooltip, isPointerInside]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-zinc-50/70 p-4 shadow-sm backdrop-blur-sm"
      onPointerEnter={(event) => {
        setIsPointerInside(true);
        updateTooltipPosition(event);
        ensureDefaultTooltip();
      }}
      onPointerMove={(event) => {
        updateTooltipPosition(event);
        ensureDefaultTooltip();
      }}
      onPointerLeave={() => {
        setIsPointerInside(false);
        setHoveredNode(null);
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(14,165,233,0.16),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(125,211,252,0.18),transparent_60%)]" />
      <svg
        viewBox="0 0 100 100"
        className="relative h-48 w-full text-zinc-400"
        aria-hidden="true"
        onPointerMove={updateTooltipPosition}
        onPointerLeave={() => {
          if (isPointerInside) {
            ensureDefaultTooltip(true);
          } else {
            setHoveredNode(null);
          }
        }}
      >
        <motion.circle
          cx={50}
          cy={50}
          r={46}
          fill="url(#ambientGlow)"
          animate={{
            r: [43.5, 46, 43.5],
            opacity: [0.12, 0.22, 0.12],
          }}
          transition={{
            r: { duration: 18, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 18, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {edges.map((edge, index) => {
          const from = nodeLookup[edge.from];
          const to = nodeLookup[edge.to];

          if (!from?.visible || !to?.visible) {
            return null;
          }

          const strokeWidth = 0.52 + edge.weight * 0.18;

          return (
            <motion.line
              key={edge.id}
              initial={false}
              animate={{
                opacity: 0.88,
                x1: from.x,
                y1: from.y,
                x2: to.x,
                y2: to.y,
                strokeDashoffset: edge.dashed ? -12 : 0,
              }}
              strokeWidth={strokeWidth}
              stroke="currentColor"
              strokeLinecap="round"
              strokeDasharray={edge.dashed ? "4 10" : "1"}
              transition={{
                opacity: { duration: 0.4, ease: "easeInOut" },
                x1: { duration: 0.45, ease: "easeInOut" },
                y1: { duration: 0.45, ease: "easeInOut" },
                x2: { duration: 0.45, ease: "easeInOut" },
                y2: { duration: 0.45, ease: "easeInOut" },
                strokeDashoffset: edge.dashed
                  ? {
                      duration: 5.4 + index * 0.12,
                      repeat: Infinity,
                      ease: "linear",
                    }
                  : undefined,
              }}
              style={{ pointerEvents: "none" }}
            />
          );
        })}

        {nodes.map((node) => (
          <g key={node.id}>
            <motion.circle
              initial={false}
              animate={{
                cx: node.x,
                cy: node.y,
                r: node.visible ? node.radius * 1.9 : node.radius * 1.6,
                opacity: node.visible ? 0.12 : 0,
              }}
              fill="rgba(56, 189, 248, 0.18)"
              transition={{
                type: "spring",
                stiffness: 110,
                damping: 22,
                mass: 0.9,
              }}
              style={{ pointerEvents: "none" }}
            />
            <motion.circle
              initial={false}
              animate={{
                cx: node.x,
                cy: node.y,
                opacity: node.visible ? 0.95 : 0,
                scale: node.visible ? 1 : 0.65,
              }}
              r={node.radius}
              fill="url(#nodeGradient)"
              stroke="rgba(14, 165, 233, 0.45)"
              strokeWidth={0.55}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 20,
                mass: 0.8,
              }}
              className={node.visible ? "cursor-pointer focus:outline-none" : undefined}
              style={{ pointerEvents: node.visible ? "auto" : "none" }}
              onPointerEnter={(event) => {
                if (!node.visible) {
                  return;
                }
                updateTooltipPosition(event);
                setHoveredNode({
                  source: "node",
                  label: node.label,
                  description: node.description,
                });
              }}
              onPointerMove={(event) => {
                if (!node.visible) {
                  return;
                }
                updateTooltipPosition(event);
              }}
              onPointerLeave={() => {
                if (isPointerInside) {
                  ensureDefaultTooltip(true);
                } else {
                  setHoveredNode(null);
                }
              }}
              onFocus={(event: ReactFocusEvent<SVGCircleElement>) => {
                event.preventDefault();
                if (!node.visible) {
                  return;
                }
                focusTooltipForNode(node);
              }}
              onBlur={() => {
                if (isPointerInside) {
                  ensureDefaultTooltip(true);
                } else {
                  setHoveredNode(null);
                }
              }}
              role="button"
              tabIndex={node.visible ? 0 : -1}
              aria-label={`${node.label}: ${node.description}`}
            />
          </g>
        ))}

        <motion.text
          x={50}
          y={90}
          textAnchor="middle"
          className="fill-cyan-600/70 text-[4px]"
          animate={{ opacity: [0.55, 0.75, 0.55] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {activeTemplateName.replace("-", " ")}
        </motion.text>

        <defs>
          <radialGradient id="ambientGlow" cx="50%" cy="50%" r="85%">
            <stop offset="0%" stopColor="rgba(125, 211, 252, 0.3)" />
            <stop offset="35%" stopColor="rgba(56, 189, 248, 0.18)" />
            <stop offset="100%" stopColor="rgba(56, 189, 248, 0)" />
          </radialGradient>
          <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(56, 189, 248, 0.85)" />
            <stop offset="70%" stopColor="rgba(14, 165, 233, 0.35)" />
            <stop offset="100%" stopColor="rgba(14, 165, 233, 0)" />
          </radialGradient>
        </defs>
      </svg>
      {hoveredNode && (
        <div
          className="pointer-events-none absolute z-30 w-52 max-w-[16rem] rounded-xl border border-cyan-500/40 bg-white/85 p-3 shadow-xl backdrop-blur-sm"
          style={{ left: tooltipPosition.left, top: tooltipPosition.top }}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">
            {hoveredNode.label}
          </p>
          <p className="mt-1 text-[11px] leading-snug text-slate-600">
            {hoveredNode.description}
          </p>
        </div>
      )}
    </div>
  );
}
