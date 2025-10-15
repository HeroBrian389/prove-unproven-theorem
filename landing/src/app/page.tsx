import { PageScaffold } from "@/components/page-scaffold";

const timestamp = "October 15, 2025 · 09:18 (Ireland, UTC+1)";

export default function Home() {
  return (
    <PageScaffold activeItemId="overview">
      <section
        id="overview"
        className="space-y-10 scroll-mt-24 border-b border-slate-200 pb-16"
      >
        <header className="space-y-4">
          <div className="space-y-2">
            <h1 className="font-serif text-4xl leading-tight text-slate-900 sm:text-5xl">
              Charting an AI-first approach to frontier mathematics
            </h1>
            <p className="font-sans text-sm text-slate-500">
              Brian Kelleher · {timestamp}
            </p>
          </div>
        </header>

        <div className="space-y-8 font-serif text-lg leading-[1.9] text-slate-700">
          <p>
            Hi, I&apos;m Brian Kelleher. Over the next 4 weeks, I will be working on using AI to
            prove an unproven mathematics theorem. I will be doing this project as part of
            the{" "}
            <a
              href="https://www.edgecity.live/patagonia"
              className="text-sky-600 underline decoration-sky-200 underline-offset-4 transition hover:text-sky-700"
              target="_blank"
              rel="noreferrer"
            >
              Edge City fellowship in Patagonia
            </a>
            .
          </p>
          <p>
            AI has fascinated and intrigued me for a long time. In 2022, I used GPT-3 to give
            me feedback on English essays for my Leaving Cert (final high school exams in
            Ireland) and over the past 3 years, I have built and scaled AI applications (like
            Microdoc).
          </p>
          <p>
            One of the most powerful ways that AI will be used is with the furtherance of
            research. I think that the use of AI will be diffuse throughout the economy and
            will take decades to fully materialise. Unregulated industries (coding, customer
            support) will adopt this most quickly, and more highly regulated/bureaucratic
            industries will adopt much more slowly (healthcare, education, law, finance).
          </p>
          <p>
            I believe that the frontier AI models are already AGI, and the most important
            bottleneck now is the tooling around these models; the instrumentation that they
            require to make a meaningful impact on the world.
          </p>
          <p>
            However, when we look at frontier science research, these models are equivalent to
            a capable undergraduate student. Leading mathematicians like Terence Tao are
            sceptical of their ability to contribute meaningfully to mathematical research.
          </p>
          <p>
            The goal of this project is to assess where the frontier AI models and scientific
            progress overlap. Key questions are:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>To what extent can these models work autonomously?</li>
            <li>
              What are the bottlenecks to their efficacy: tooling, verification, raw intelligence,
              or training data?
            </li>
          </ul>
          <p>
            Other papers which inspire me are{" "}
            <a
              href="https://arxiv.org/pdf/2502.01839"
              className="text-sky-600 underline decoration-sky-200 underline-offset-4 transition hover:text-sky-700"
              target="_blank"
              rel="noreferrer"
            >
              Sample, Scrutinize and Scale: Effective Inference-Time Search by Scaling
              Verification
            </a>{" "}
            by Zhao et al., which shows how scaling sampling-based search with stronger
            self-verification pushes systems like Gemini v1.5 Pro beyond o1-Preview on rigorous
            reasoning benchmarks, and{" "}
            <a
              href="https://arxiv.org/pdf/2504.13837"
              className="text-sky-600 underline decoration-sky-200 underline-offset-4 transition hover:text-sky-700"
              target="_blank"
              rel="noreferrer"
            >
              Does Reinforcement Learning Really Incentivize Reasoning Capacity in LLMs Beyond
              the Base Model?
            </a>{" "}
            by Yue et al., which finds that current RL with verifiable rewards mainly improves
            sampling efficiency while leaving core reasoning boundaries constrained by the base
            models themselves.
          </p>
          <p>
            I will be publishing my research, progress, and related reading as I go.
          </p>
        </div>
      </section>
    </PageScaffold>
  );
}
