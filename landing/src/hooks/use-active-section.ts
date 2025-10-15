"use client";

import { useEffect, useMemo, useState } from "react";

const DEFAULT_THRESHOLD = Object.freeze([0, 0.2, 0.4, 0.6]);

interface UseActiveSectionOptions {
  rootMargin?: string;
  threshold?: number[];
}

export function useActiveSection(
  sectionIds: string[],
  { rootMargin = "-45% 0px -45% 0px", threshold = DEFAULT_THRESHOLD }: UseActiveSectionOptions = {},
) {
  const observedIds = useMemo(() => sectionIds.filter(Boolean), [sectionIds]);
  const observerThreshold = useMemo(() => [...threshold], [threshold]);

  const fallbackId = observedIds[0] ?? null;
  const [activeId, setActiveId] = useState<string | null>(fallbackId);

  useEffect(() => {
    if (!fallbackId) {
      setActiveId(null);
      return;
    }

    setActiveId((current) => (current && observedIds.includes(current) ? current : fallbackId));
  }, [fallbackId, observedIds]);

  useEffect(() => {
    if (observedIds.length === 0 || typeof IntersectionObserver === "undefined") {
      setActiveId(null);
      return;
    }

    const elements = observedIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (elements.length === 0) {
      setActiveId(null);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (intersecting.length > 0) {
          setActiveId(intersecting[0].target.id);
          return;
        }

        const proximitySorted = [...entries].sort(
          (a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top),
        );

        if (proximitySorted[0]) {
          setActiveId(proximitySorted[0].target.id);
        }
      },
      {
        rootMargin,
        threshold: observerThreshold,
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [observedIds, observerThreshold, rootMargin]);

  return activeId;
}
