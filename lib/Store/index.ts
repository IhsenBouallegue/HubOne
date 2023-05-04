import { Hub, LinkGroup, FooterLink, Link } from "@prisma/client";
import { create } from "zustand";

type Settings = {
  editMode: boolean;
  compactMode: boolean;
  hub: Hub;
  links: Link[];
  linkGroups: LinkGroup[];
  footerLinks: FooterLink[];
  createModalOpened: boolean;
};
type Actions = {
  setEditMode: (editMode: boolean) => void;
  setCompactMode: (compactMode: boolean) => void;
  setHub: (hub: Hub) => void;
  setLinks: (links: Link[]) => void;
  setLinkGroups: (linkGroups: LinkGroup[]) => void;
  setFooterLinks: (footerLinks: FooterLink[]) => void;
  setCreateModalOpened: (createModalOpened: boolean) => void;
};
export const useHubOneStore = create<Settings & Actions>((set) => ({
  editMode: false,
  compactMode: false,
  hub: {} as Hub,
  links: [],
  linkGroups: [],
  footerLinks: [],
  createModalOpened: false,
  setEditMode: (editMode) => set(() => ({ editMode })),
  setCompactMode: (compactMode) => set(() => ({ compactMode })),
  setHub: (hub) => set(() => ({ hub })),
  setLinks: (links) => set(() => ({ links })),
  setLinkGroups: (linkGroups) => set(() => ({ linkGroups })),
  setFooterLinks: (footerLinks) => set(() => ({ footerLinks })),
  setCreateModalOpened: (createModalOpened) =>
    set(() => ({ createModalOpened })),
}));
