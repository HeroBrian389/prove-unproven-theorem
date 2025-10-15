import { PageScaffold } from "@/components/page-scaffold";
import { UpdateSummary } from "@/components/update-summary";
import { getProjectUpdates } from "@/lib/updates";

const updates = getProjectUpdates();

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

        {updates.length === 0 ? (
          <div
            id="latest-coming-soon"
            className="rounded-2xl border border-dashed border-sky-200 bg-white/90 p-6 text-slate-500 shadow-sm"
          >
            Entries begin once I touchdown in Patagonia. Expect weekly status notes, model diagnostics,
            and open questions for collaborators.
          </div>
        ) : (
          <div className="space-y-8">
            {updates.map((update) => (
              <article
                key={update.id}
                className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm"
              >
                <p className="font-sans text-xs uppercase tracking-[0.35em] text-slate-400">
                  {update.displayDate}
                </p>

                <h2 className="mt-4 font-serif text-2xl text-slate-900">{update.title}</h2>

                <p className="mt-3 font-serif text-[1.05rem] leading-relaxed text-slate-700">
                  <UpdateSummary summary={update.summary} />
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </PageScaffold>
  );
}
