"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEvent, useCallback } from "react";

import { cn } from "@/lib/utils";

export type SidebarNavItem = {
  id: string;
  title: string;
  description?: string;
  href: string;
  children?: { id: string; title: string; href: string }[];
};

interface SidebarNavigationProps {
  items: SidebarNavItem[];
  activeItemId: string | null;
  activeChildId?: string | null;
  onNavigate?: () => void;
}

export function SidebarNavigation({
  items,
  activeItemId,
  activeChildId = null,
  onNavigate,
}: SidebarNavigationProps) {
  const pathname = usePathname();

  const handleAnchorNavigate = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, href: string) => {
      if (typeof window === "undefined") {
        return;
      }

      try {
        const url = new URL(href, window.location.origin);
        const isSamePath = url.pathname === pathname;

        if (isSamePath && url.hash) {
          event.preventDefault();

          const targetId = decodeURIComponent(url.hash.slice(1));
          const el = document.getElementById(targetId);

          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            window.history.replaceState(null, "", `${url.pathname}${url.hash}`);
          }
        }
      } catch {
        // Silently fall back to default navigation when parsing fails.
      }
    },
    [pathname],
  );

  return (
    <nav aria-label="Primary" className="space-y-4 font-sans text-sm">
      {items.map((item) => {
        const isActive = item.id === activeItemId;
        return (
          <div key={item.id} className="space-y-1">
            <Link
              href={item.href}
              onClick={(event) => {
                onNavigate?.();
                handleAnchorNavigate(event, item.href);
              }}
              className={cn(
                "block rounded-xl px-4 py-1 text-left text-sm transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300",
                isActive
                  ? "text-slate-900"
                  : "text-slate-500 hover:text-slate-700",
              )}
            >
              <span className="font-medium">{item.title}</span>
            </Link>

            {isActive && item.children && item.children.length > 0 ? (
              <div
                role="list"
                className="ml-5 space-y-1 border-l border-slate-900 dark:border-slate-100 pl-1"
              >
                {item.children.map((child) => {
                  const childIsActive = child.id === activeChildId;
                  return (
                    <Link
                      key={child.id}
                      href={child.href}
                      onClick={(event) => {
                        onNavigate?.();
                        handleAnchorNavigate(event, child.href);
                      }}
                      className={cn(
                        "block rounded-md px-2 py-1.5 text-left text-sm transition-colors",
                        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300",
                        childIsActive
                          ? "text-slate-900"
                          : "text-slate-500 hover:text-slate-700",
                      )}
                    >
                      {child.title}
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}
