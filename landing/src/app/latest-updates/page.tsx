import { PageScaffold } from "@/components/page-scaffold";

export default function LatestUpdatesPage() {
  return (
    <PageScaffold activeItemId="latest-updates">
      <section
        id="latest-updates"
        className="space-y-6 scroll-mt-24 border-b border-slate-200 pb-16"
      >
        <header className="space-y-2">
          <h1 className="font-serif text-4xl text-slate-900">Milestones & cadence</h1>
          <p className="font-sans text-sm text-slate-500">
            Milestones, breakthroughs, and setbacks will collect here as the work scales up.
          </p>
        </header>

        <div
          id="latest-coming-soon"
          className="rounded-2xl border border-dashed border-sky-200 bg-white/90 p-6 text-slate-500 shadow-sm"
        >
          Entries begin once I touchdown in Patagonia. Expect weekly status notes, model diagnostics,
          and open questions for collaborators.
        </div>
      </section>
    </PageScaffold>
  );
}
