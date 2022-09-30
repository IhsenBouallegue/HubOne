import React, { useContext, useState } from "react";

type Settings = {
  editMode: boolean;
};

const defaultSettings: Settings = {
  editMode: false,
};

const HubOneContext = React.createContext({
  ...defaultSettings,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSettings: (settings: Settings) => {},
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
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    setState((prevState) => ({
      ...prevState,
      ...settings,
    }));
  };

  const initState = {
    ...defaultSettings,
    setSettings,
  };

  const [state, setState] = useState(initState);

  return (
    <HubOneContext.Provider value={state}>{children}</HubOneContext.Provider>
  );
};
