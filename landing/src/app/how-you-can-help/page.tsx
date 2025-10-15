import { PageScaffold } from "@/components/page-scaffold";

export default function HowYouCanHelpPage() {
  return (
    <PageScaffold
      activeItemId="how-you-can-help"
    >
      <section
        id="how-you-can-help"
        className="space-y-6 scroll-mt-24 pb-10"
      >
        <header className="space-y-2">
          <h1 className="font-serif text-4xl text-slate-900">Support pathways</h1>
          <p className="font-sans text-sm text-slate-500">
            I want this project to be collaborative, transparent, and well-supported.
          </p>
        </header>

        <div
          id="support-intro"
          className="rounded-2xl border border-sky-200 bg-sky-50/80 p-6 shadow-sm"
        >
          <ul className="space-y-3 font-sans text-sm text-slate-700">
            <li>
              • OpenAI or foundation model partners: access to cutting-edge models, eval harnesses, and
              credits dramatically accelerates the work.
            </li>
            <li>
              • Mathematicians: feedback on conjectures, proposed proof sketches, and promising directions is gold dust.
            </li>
            <li>
              • Tool builders: ideas for orchestration, verification, or graph-theoretic search pipelines are welcome.
            </li>
          </ul>
          <p className="mt-5 font-sans text-xs uppercase tracking-[0.26em] text-sky-600">
            Email · brian@microdoc.io
          </p>
        </div>
      </section>
    </PageScaffold>
  );
}
