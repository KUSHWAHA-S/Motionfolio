// src/store/usePortfolioStore.ts
import { create } from "zustand";
import { defaultTheme } from "@/lib/colors";
import {
  Section,
  PortfolioTheme,
  Portfolio,
} from "@/types/portfolio";
import { DEFAULT_TEMPLATE } from "@/types/constants";

export interface PortfolioState {
  title: string;
  theme: PortfolioTheme;
  sections: Section[];
  /**
   * Identifier for the visual template used to render this portfolio.
   * This controls which template component is used on preview/public pages.
   */
  template: string;

  setTitle: (title: string) => void;
  setTheme: (theme: Partial<PortfolioTheme>) => void;
  addSection: (section: Section) => void;
  updateSection: (id: string, section: Partial<Section>) => void;
  removeSection: (id: string) => void;
  setTemplate: (template: string) => void;
  reset: () => void;
  load: (data: Partial<PortfolioState>) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  title: "Untitled Portfolio",
  theme: defaultTheme, // Uses centralized colors
  sections: [],
  // Current default template – this is the existing LivePreview design
  template: DEFAULT_TEMPLATE,

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
  setTemplate: (template) => set({ template }),
  reset: () =>
    set({
      title: "Untitled Portfolio",
      theme: defaultTheme, // Uses centralized colors
      sections: [],
      template: DEFAULT_TEMPLATE,
    }),
  load: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),
}));
