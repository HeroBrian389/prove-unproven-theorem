const snapshot = {
  status: "Week 2 · In motion",
  focus: "Formalising the candidate theorem and decomposition strategy.",
  tooling: "o1-preview orchestration + Lean validation harness",
  checkpoint: {
    label: "Oct 14, 2025",
    detail:
      "Lean tactics for base lemmas compiled; identified two brittle proof steps awaiting search tuning.",
  },
  milestone: {
    label: "Oct 21, 2025",
    detail: "Lock the target theorem statement and ship a proof-sketch dossier.",
  },
  blockers:
    "Need higher-quality exemplars of mechanised proofs covering analogous symmetry reductions.",
};

export function ProjectSnapshotCard() {
  return (
    <section
      aria-labelledby="project-snapshot-heading"
      className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur"
    >
      <div className="flex items-start justify-between gap-4">
        <p
          id="project-snapshot-heading"
          className="font-sans text-xs uppercase tracking-[0.3em] text-slate-500"
        >
          Project Snapshot
        </p>
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-3 py-1 text-[0.65rem] font-medium text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
          {snapshot.status}
        </span>
      </div>

      <p className="mt-4 font-serif text-base leading-relaxed text-slate-700">
        Mapping the proof search surface while keeping verification loops tight.
      </p>

      <dl className="mt-6 space-y-5">
        <div className="space-y-1">
          <dt className="font-sans text-[0.7rem] uppercase tracking-[0.25em] text-slate-500">
            Current focus
          </dt>
          <dd className="font-serif text-[0.95rem] leading-relaxed text-slate-900">
            {snapshot.focus}
          </dd>
        </div>

        <div className="space-y-1">
          <dt className="font-sans text-[0.7rem] uppercase tracking-[0.25em] text-slate-500">
            Active tooling
          </dt>
          <dd className="font-serif text-[0.95rem] leading-relaxed text-slate-900">
            {snapshot.tooling}
          </dd>
        </div>

        <div className="space-y-1">
          <dt className="font-sans text-[0.7rem] uppercase tracking-[0.25em] text-slate-500">
            Latest checkpoint
          </dt>
          <dd className="font-serif text-[0.95rem] leading-relaxed text-slate-900">
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-slate-400">
              {snapshot.checkpoint.label}
            </span>
            <br />
            {snapshot.checkpoint.detail}
          </dd>
        </div>

        <div className="space-y-1">
          <dt className="font-sans text-[0.7rem] uppercase tracking-[0.25em] text-slate-500">
            Next milestone
          </dt>
          <dd className="font-serif text-[0.95rem] leading-relaxed text-slate-900">
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-slate-400">
              {snapshot.milestone.label}
            </span>
            <br />
            {snapshot.milestone.detail}
          </dd>
        </div>

        <div className="space-y-1">
          <dt className="font-sans text-[0.7rem] uppercase tracking-[0.25em] text-slate-500">
            Constraints
          </dt>
          <dd className="font-serif text-[0.95rem] leading-relaxed text-slate-900">
            {snapshot.blockers}
          </dd>
        </div>
      </dl>
    </section>
  );
}
