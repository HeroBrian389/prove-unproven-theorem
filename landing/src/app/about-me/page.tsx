import { PageScaffold } from "@/components/page-scaffold";

export default function AboutMePage() {
  return (
    <PageScaffold activeItemId="about-me" sectionIds={["about-profile", "about-collaborators"]}>
      <section
        id="about-me"
        className="space-y-6 scroll-mt-24 border-b border-slate-200 pb-16"
      >
        <header className="space-y-2">
          <h1 className="font-serif text-4xl text-slate-900">People & tooling</h1>
          <p className="font-sans text-sm text-slate-500">
            Quick context on the collaborators, background, and systems involved in the project.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <div
            id="about-profile"
            className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm"
          >
            <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.22em] text-sky-600">
              Brian Kelleher
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Maths undergrad at Trinity College Dublin. Builder of AI-native products including Microdoc,
              used by clinicians across Ireland, the UK, and the US.
            </p>
            <p className="mt-4 text-sm text-slate-600">
              During the Edge City fellowship I&apos;ll orchestrate GPT-5 family models and bespoke toolchains
              to pursue new results in graph theory and adjacent areas.
            </p>
          </div>

          <div
            id="about-collaborators"
            className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm"
          >
            <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.22em] text-sky-600">
              Collaborators
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Fellows and advisors from Edge City, Oxford, and Trinity will help steer the mathematical agenda
              and pressure-test the AI pipelines as they evolve.
            </p>
          </div>
        </div>
      </section>
    </PageScaffold>
  );
}
