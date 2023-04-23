/* eslint-disable @typescript-eslint/no-unused-vars */
import type { FooterLink, Hub, Link, LinkGroup } from "@prisma/client";
import React, { useContext, useState } from "react";

export type Settings = {
  editMode: boolean;
  hub: Hub;
  links: Link[];
  linkGroups: LinkGroup[];
  footerLinks: FooterLink[];
  createModalOpened: boolean;
};

const defaultSettings: Settings = {
  editMode: false,
  hub: {} as Hub,
  links: [],
  linkGroups: [],
  footerLinks: [],
  createModalOpened: false,
};

const HubOneContext = React.createContext({
  ...defaultSettings,
  setSettings: (settings: Settings) => {},
  setHub: (hub: Hub) => {},
  setLinks: (link: Link[]) => {},
  setLinkGroups: (linkGroups: LinkGroup[]) => {},
  setFooterLinks: (footerLinks: FooterLink[]) => {},
  setCreateModalOpened: (createModalOpened: boolean) => {},
});

export const useHubOneContext = () => {
  return useContext(HubOneContext);
};

export const HubOneContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const setSettings = (settings: Settings) => {
    setState((prevState) => ({
      ...prevState,
      ...settings,
    }));
  };
  const setHub = (hub: Hub) => {
    setState((prevState) => ({
      ...prevState,
      hub,
    }));
  };
  const setLinks = (links: Link[]) => {
    setState((prevState) => ({
      ...prevState,
      links,
    }));
  };
  const setLinkGroups = (linkGroups: LinkGroup[]) => {
    setState((prevState) => ({
      ...prevState,
      linkGroups,
    }));
  };
  const setFooterLinks = (footerLinks: FooterLink[]) => {
    setState((prevState) => ({
      ...prevState,
      footerLinks,
    }));
  };
  const setCreateModalOpened = (createModalOpened: boolean) => {
    setState((prevState) => ({
      ...prevState,
      createModalOpened,
    }));
  };

  const initState = {
    ...defaultSettings,
    setSettings,
    setHub,
    setLinks,
    setLinkGroups,
    setFooterLinks,
    setCreateModalOpened,
  };

  const [state, setState] = useState(initState);

  return (
    <HubOneContext.Provider value={state}>{children}</HubOneContext.Provider>
  );
};
