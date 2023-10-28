"use client";

import { create } from "zustand";

type Settings = {
  selectedOrganizationId: string | undefined;
};
type Actions = {
  setSelectedOrganizationId: (selectedOrganizationId: string) => void;
};

export const useDashboardStore = create<Settings & Actions>((set) => ({
  selectedOrganizationId: undefined,
  setSelectedOrganizationId: (selectedOrganizationId) =>
    set(() => ({ selectedOrganizationId })),
}));
