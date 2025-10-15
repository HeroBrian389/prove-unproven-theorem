import Link from "next/link";

const latestUpdate = {
  date: "Oct 14, 2025",
  title: "Selected graph theory as the area of interest to work on.",
  summary: (
    <>
      The ambitious version of this project will be to solve an{" "}
      <a
        href="https://www.erdosproblems.com/lists"
        target="_blank"
        rel="noreferrer"
        className="text-sky-700 underline decoration-sky-200 underline-offset-4 transition hover:text-sky-900"
      >
        Erdős open problem
      </a>
      .
    </>
  ),
};

export function ProjectSnapshotCard() {
  return (
    <section
      aria-label="Latest project update"
      className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/75 p-7 shadow-sm backdrop-blur"
    >
      <p className="font-sans text-[0.65rem] uppercase tracking-[0.35em] text-slate-400">
        {latestUpdate.date}
      </p>

      <h2 className="mt-4 font-serif text-xl leading-snug text-slate-900">
        {latestUpdate.title}
      </h2>

      <p className="mt-3 font-serif text-[1rem] leading-relaxed text-slate-700">
        {latestUpdate.summary}
      </p>

      <Link
        href="/latest-updates"
        className="mt-6 inline-flex items-center text-sm font-medium text-sky-700 transition hover:text-sky-900"
      >
        Browse all updates →
      </Link>
    </section>
  );
}
