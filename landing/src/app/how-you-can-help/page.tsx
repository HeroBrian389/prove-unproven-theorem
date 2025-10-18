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
          <h1 className="font-serif text-4xl text-slate-900">Support</h1>
          <p className="font-sans text-sm text-slate-500">
            I really appreciate any and all help I can get.
          </p>
        </header>

        <div
          id="support-intro"
          className="rounded-2xl border border-sky-200 bg-sky-50/80 p-6 shadow-sm"
        >
          <ul className="space-y-3 font-sans text-sm text-slate-700">
            <li>
              OpenAI or foundation model partners who can provide credits, support, and tooling.
            </li>
            <li>
              Mathematicians who could feedback on conjectures, proposed proof sketches, and promising directions.
            </li>
          </ul>
          <p className="mt-5 font-sans text-xs uppercase tracking-[0.26em] text-sky-600">
            Email brian [at] microdoc [dot] io
          </p>
        </div>
      </section>
    </PageScaffold>
  );
}
