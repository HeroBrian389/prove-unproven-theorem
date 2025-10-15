"use client";

import { ReactNode, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";

import { sidebarItems } from "@/config/navigation";
import { useActiveSection } from "@/hooks/use-active-section";

import { ProjectSnapshotCard } from "./project-snapshot-card";
import { SidebarNavigation } from "./sidebar-navigation";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { GraphAnimation } from "./graph-animation";

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
        <div className="flex items-center justify-end pt-6 lg:hidden">
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
              <SheetHeader className="sr-only">
                <SheetTitle>Site navigation</SheetTitle>
              </SheetHeader>

              <AnimatePresence mode="wait">
                {isMobileNavOpen ? (
                  <motion.div
                    key="mobile-nav"
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="mx-auto flex h-full w-full max-w-md flex-col"
                  >
                    <div className="flex justify-center">
                      <GraphAnimation />
                    </div>

                    <div className="mt-10 flex-1 overflow-y-auto pb-6">
                      <SidebarNavigation
                        items={sidebarItems}
                        activeItemId={activeItemId}
                        activeChildId={activeChildId}
                        onNavigate={() => setIsMobileNavOpen(false)}
                      />
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </SheetContent>
          </Sheet>
        </div>

        <div className="lg:grid lg:grid-cols-[18rem_minmax(0,1fr)_20rem] lg:gap-16 lg:pt-10">
          <aside className="relative hidden lg:block">
            <div className="sticky top-10 flex h-[calc(100vh-5rem)] flex-col gap-8">
              <GraphAnimation />
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
