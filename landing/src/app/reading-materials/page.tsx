import { PageScaffold } from "@/components/page-scaffold";

export default function ReadingMaterialsPage() {
  return (
    <PageScaffold
      activeItemId="reading-materials"
    >
      <section
        id="reading-materials"
        className="space-y-6 scroll-mt-24 border-b border-slate-200 pb-16"
      >
        <header className="space-y-2">
          <h1 className="font-serif text-4xl text-slate-900">Working bibliography</h1>
          <p className="font-sans text-sm text-slate-500">
            A living repository of the papers, notes, and intermediate artifacts informing the work.
          </p>
        </header>

        <div
          id="reading-curation"
          className="space-y-6 rounded-2xl border border-dashed border-sky-200 bg-white/90 p-6 text-slate-700 shadow-sm"
        >
          <p className="font-serif text-lg leading-relaxed">
            I am actively cataloging work at the intersection of automated reasoning, test-time
            compute, and research tooling. Highlights from the current stack:
          </p>

          <ul className="space-y-4">
            <li className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
              <div className="font-sans text-xs uppercase tracking-[0.2em] text-sky-600">
                Test-time compute
              </div>
              <h2 className="mt-1 font-serif text-2xl text-slate-900">
                <a
                  href="https://arxiv.org/pdf/2502.01839"
                  className="text-sky-700 underline decoration-sky-200 underline-offset-4 transition hover:text-sky-800"
                  target="_blank"
                  rel="noreferrer"
                >
                  Sample, Scrutinize and Scale: Effective Inference-Time Search by Scaling
                  Verification
                </a>
              </h2>
              <p className="mt-2 text-base leading-relaxed">
                Zhao et al. probe how simply scaling sampling-based search with stronger
                self-verification lets Gemini v1.5 Pro surpass o1-Preview on reasoning benchmarks,
                attributing gains to implicit improvements in verification accuracy as the candidate
                pool widens.
              </p>
            </li>

            <li className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
              <div className="font-sans text-xs uppercase tracking-[0.2em] text-sky-600">
                RL for reasoning
              </div>
              <h2 className="mt-1 font-serif text-2xl text-slate-900">
                <a
                  href="https://arxiv.org/pdf/2504.13837"
                  className="text-sky-700 underline decoration-sky-200 underline-offset-4 transition hover:text-sky-800"
                  target="_blank"
                  rel="noreferrer"
                >
                  Does Reinforcement Learning Really Incentivize Reasoning Capacity in LLMs Beyond
                  the Base Model?
                </a>
              </h2>
              <p className="mt-2 text-base leading-relaxed">
                Yue et al. evaluate RL with verifiable rewards across math, coding, and multimodal
                tasks, finding that while sampling efficiency improves at low pass@k, the reasoning
                boundary largely remains inside what the base model already produces, underscoring
                tooling and training gaps.
              </p>
            </li>
          </ul>
        </div>
      </section>
    </PageScaffold>
  );
}
