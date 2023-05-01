import { Hub, LinkGroup, FooterLink } from "@prisma/client";
import { Link } from "react-scroll";
import { create } from "zustand";

type Settings = {
  editMode: boolean;
  hub: Hub;
  links: Link[];
  linkGroups: LinkGroup[];
  footerLinks: FooterLink[];
  createModalOpened: boolean;
};
type Actions = {
  setEditMode: (editMode: boolean) => void;
  //   setHub: (hub: Hub) => void;
  //   setLinks: (link: Link[]) => void;
  //   setLinkGroups: (linkGroups: LinkGroup[]) => void;
  //   setFooterLinks: (footerLinks: FooterLink[]) => void;
  //   setCreateModalOpened: (createModalOpened: boolean) => void;
};
export const useHubOneStore = create<Settings & Actions>((set) => ({
  editMode: false,
  hub: {} as Hub,
  links: [],
  linkGroups: [],
  footerLinks: [],
  createModalOpened: false,
  setEditMode: (editMode) => set(() => ({ editMode })),
}));
