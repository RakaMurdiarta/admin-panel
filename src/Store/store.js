import { create } from "zustand";

export const useAnimateIndex = create((set) => {
  return {
    selectedIndex: null,
    setSelectedIndex: (index) => set({ selectedIndex: index }),
  };
});

export const useHistoryPath = create((set) => {
  return {
    historypath: "",
    setHistoryPath: (path) => set({ historypath: path }),
  };
});
