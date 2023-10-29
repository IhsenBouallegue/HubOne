import { create } from "zustand";

type Settings = {
  editMode: boolean;
  compactMode: boolean;
  hubId: string | null;
  hubSpaceId: string | null;
  createModalOpened: boolean;
};
type Actions = {
  setEditMode: (editMode: boolean) => void;
  setCompactMode: (compactMode: boolean) => void;
  setHubId: (hubId: string) => void;
  setCreateModalOpened: (createModalOpened: boolean) => void;
};
export const useHubOneStore = create<Settings & Actions>((set) => ({
  editMode: false,
  compactMode: false,
  hubId: null,
  hubSpaceId: null,
  createModalOpened: false,
  setEditMode: (editMode) => set(() => ({ editMode })),
  setCompactMode: (compactMode) => set(() => ({ compactMode })),
  setHubId: (hubId) => set(() => ({ hubId })),
  setCreateModalOpened: (createModalOpened) =>
    set(() => ({ createModalOpened })),
}));
