"use client";

import { ReactNode, useState } from "react";
import { Menu } from "lucide-react";

import { sidebarItems } from "@/config/navigation";
import { useActiveSection } from "@/hooks/use-active-section";

import { ProjectSnapshotCard } from "./project-snapshot-card";
import { SidebarNavigation } from "./sidebar-navigation";
import { StaticGraph } from "./static-graph";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface PageScaffoldProps {
  activeItemId: string;
  sectionIds?: string[];
  children: ReactNode;
}

export function PageScaffold({
  activeItemId,
  sectionIds = [],
  children,
}: PageScaffoldProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const activeChildId = useActiveSection(sectionIds);

  return (
    <div className="relative w-full">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pt-6 lg:hidden">
          <StaticGraph variant="compact" className="w-24" />

          <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open navigation"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="top"
              className="h-dvh w-screen border-none bg-background px-6 pb-12 pt-16 sm:px-10"
            >
              <div className="mx-auto flex h-full w-full max-w-md flex-col">
                <div className="flex justify-center">
                  <StaticGraph className="w-44" />
                </div>

                <div className="mt-10 flex-1 overflow-y-auto pb-6">
                  <SidebarNavigation
                    items={sidebarItems}
                    activeItemId={activeItemId}
                    activeChildId={activeChildId}
                    onNavigate={() => setIsMobileNavOpen(false)}
                  />
                </div>

                <p className="mt-auto text-center font-mono text-xs uppercase tracking-[0.4em] text-slate-400">
                  Research navigator
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="lg:grid lg:grid-cols-[18rem_minmax(0,1fr)_16rem] lg:gap-14 lg:pt-10">
          <aside className="relative hidden lg:block">
            <div className="sticky top-10 flex h-[calc(100vh-5rem)] flex-col gap-8">
              <StaticGraph className="w-full" />
              <SidebarNavigation
                items={sidebarItems}
                activeItemId={activeItemId}
                activeChildId={activeChildId}
              />
            </div>
          </aside>

          <main className="mx-auto mt-10 w-full max-w-2xl space-y-20 pb-16 lg:col-start-2 lg:mt-0">
            {children}
          </main>

          <aside className="relative hidden lg:block">
            <div className="sticky top-10 flex flex-col">
              <ProjectSnapshotCard />
            </div>
          </aside>
        </div>

        <div className="mt-12 lg:hidden">
          <ProjectSnapshotCard />
        </div>
      </div>
    </div>
  );
}
