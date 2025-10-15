import updatesData from "@/data/updates.json";
import { ProjectUpdate } from "@/types/update";

const updates = updatesData as ProjectUpdate[];

const sortedUpdates = [...updates].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export function getProjectUpdates(): ProjectUpdate[] {
  return sortedUpdates;
}

export function getLatestProjectUpdate(): ProjectUpdate | undefined {
  return sortedUpdates[0];
}
