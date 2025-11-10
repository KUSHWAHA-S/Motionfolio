import { create } from "zustand";

type Section = {
  id: string;
  type: string;
  data: any;
  animation: any;
};

interface PortfolioState {
  title: string;
  theme: any;
  sections: Section[];
  setTitle: (title: string) => void;
  addSection: (section: Section) => void;
  updateSection: (id: string, section: Partial<Section>) => void;
  removeSection: (id: string) => void;
  reset: () => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  title: "Untitled Portfolio",
  theme: { primary: "#0EA5E9", secondary: "#1E293B" },
  sections: [],
  setTitle: (title) => set({ title }),
  addSection: (section) =>
    set((state) => ({ sections: [...state.sections, section] })),
  updateSection: (id, updated) =>
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === id ? { ...s, ...updated } : s
      ),
    })),
  removeSection: (id) =>
    set((state) => ({ sections: state.sections.filter((s) => s.id !== id) })),
  reset: () =>
    set({ title: "Untitled Portfolio", sections: [], theme: { primary: "#0EA5E9", secondary: "#1E293B" } }),
}));
