import { PageScaffold } from "@/components/page-scaffold";

export default function AboutMePage() {
  return (
    <PageScaffold activeItemId="about-me" sectionIds={["about-profile", "about-collaborators"]}>
      <section
        id="about-me"
        className="space-y-6 scroll-mt-24 border-b border-slate-200 pb-16"
      >
        <header className="space-y-2">
          <h1 className="font-serif text-4xl text-slate-900">About me</h1>
          <p className="font-sans text-sm text-slate-500">
            A bit about me and the tools I'm working with.
          </p>
        </header>


          <div
            id="about-profile"
            className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm"
          >
            <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.22em] text-sky-600">
              Brian Kelleher
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Founder and CEO of Microdoc, AI-powered dictation for doctors, used by doctors across Ireland, the UK, and the US.
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
              Fellows and advisors from Edge City, Oxford, and Trinity will guide and evaluate the AI-generated mathematics as this project evolves.
            </p>
          </div>
      </section>
    </PageScaffold>
  );
}
