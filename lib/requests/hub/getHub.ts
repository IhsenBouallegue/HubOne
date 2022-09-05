import type { Hub } from "@prisma/client";

import axios from "../../axios";

export const getHub = async (hubPath: string) => {
  const { data } = await axios.get<Hub | Hub[]>(`hubs/${hubPath}`, {
    headers: {
      Accept: "application/json",
    },
  });
  if (!hubPath && Array.isArray(data)) {
    return data[0] as Hub;
  }
  return data as Hub;
};
