import { create } from "zustand";

type Settings = {
  editMode: boolean;
  compactMode: boolean;
  hubId: string | null;
  hubSpaceId: string | undefined;
};
type Actions = {
  setEditMode: (editMode: boolean) => void;
  setCompactMode: (compactMode: boolean) => void;
  setHubId: (hubId: string) => void;
};
export const useHubOneStore = create<Settings & Actions>((set) => ({
  editMode: false,
  compactMode: false,
  hubId: null,
  hubSpaceId: undefined,
  setEditMode: (editMode) => set(() => ({ editMode })),
  setCompactMode: (compactMode) => set(() => ({ compactMode })),
  setHubId: (hubId) => set(() => ({ hubId })),
}));
