import Link from "next/link";

import { UpdateSummary } from "@/components/update-summary";
import { getLatestProjectUpdate } from "@/lib/updates";

const latestUpdate = getLatestProjectUpdate();

export function ProjectSnapshotCard() {
  if (!latestUpdate) {
    return (
      <section
        aria-label="Latest project update"
        className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/75 p-7 text-slate-600 shadow-sm backdrop-blur"
      >
        <p className="font-sans text-[0.65rem] uppercase tracking-[0.35em]">Updates coming soon</p>
        <p className="mt-4 font-serif text-[1rem] leading-relaxed">
          I&apos;ll share project milestones and research notes here once the work is underway.
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

  return (
    <section
      aria-label="Latest project update"
      className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/75 p-7 shadow-sm backdrop-blur"
    >
      <p className="font-sans text-[0.65rem] uppercase tracking-[0.35em] text-slate-400">
        {latestUpdate.displayDate}
      </p>

      <h2 className="mt-4 font-serif text-xl leading-snug text-slate-900">
        {latestUpdate.title}
      </h2>

      <p className="mt-3 font-serif text-[1rem] leading-relaxed text-slate-700">
        <UpdateSummary summary={latestUpdate.summary} />
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
