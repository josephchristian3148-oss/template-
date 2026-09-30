import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SAMPLES } from "./samples";
import type { Roadmap } from "./types";

interface ArchiveState {
  saved: Record<string, Roadmap>;
  order: string[];
  save: (roadmap: Roadmap) => void;
  remove: (id: string) => void;
}

export const useArchive = create<ArchiveState>()(
  persist(
    (set, get) => ({
      saved: {},
      order: [],
      save: (roadmap) => {
        const next = { ...get().saved, [roadmap.id]: roadmap };
        const order = [roadmap.id, ...get().order.filter((id) => id !== roadmap.id)];
        set({ saved: next, order });
      },
      remove: (id) => {
        const next = { ...get().saved };
        delete next[id];
        set({ saved: next, order: get().order.filter((x) => x !== id) });
      },
    }),
    { name: "axial-archive-v1" },
  ),
);

export function getRoadmap(id: string): Roadmap | undefined {
  const sample = SAMPLES.find((s) => s.id === id);
  if (sample) return sample;
  return useArchive.getState().saved[id];
}

export function listArchive(): Roadmap[] {
  const { saved, order } = useArchive.getState();
  return order.map((id) => saved[id]).filter(Boolean);
}
