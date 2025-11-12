// src/store/usePortfolioStore.ts
import { create } from "zustand";

export type Section = {
  id: string;
  type: string;
  data: any;
  animation: any;
};

export interface Theme {
  primary: string;
  secondary: string;
}

export interface PortfolioState {
  title: string;
  theme: Theme;
  sections: Section[];

  setTitle: (title: string) => void;
  setTheme: (theme: Partial<Theme>) => void;
  addSection: (section: Section) => void;
  updateSection: (id: string, section: Partial<Section>) => void;
  removeSection: (id: string) => void;
  reset: () => void;
  load: (data: Partial<PortfolioState>) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  title: "Untitled Portfolio",
  theme: { primary: "#0EA5E9", secondary: "#1E293B" },
  sections: [],

  setTitle: (title) => set({ title }),
  setTheme: (theme) =>
    set((state) => ({ theme: { ...state.theme, ...theme } })),
  addSection: (section) =>
    set((state) => ({ sections: [...state.sections, section] })),
  updateSection: (id, updated) =>
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === id ? { ...s, ...updated } : s
      ),
    })),
  removeSection: (id) =>
    set((state) => ({
      sections: state.sections.filter((s) => s.id !== id),
    })),
  reset: () =>
    set({
      title: "Untitled Portfolio",
      theme: { primary: "#0EA5E9", secondary: "#1E293B" },
      sections: [],
    }),
  load: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),
}));
