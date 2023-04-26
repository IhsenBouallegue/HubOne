/* eslint-disable arrow-body-style */
import type { Hub } from "@prisma/client";

import axios from "../../axios";

export const getHubWithPath = (hubPath: string): Promise<Hub> => {
  return axios
    .get<Hub | Hub[]>(`path/hubs/${hubPath}`, {
      headers: {
        Accept: "application/json",
      },
    })
    .then(({ data }) => {
      if (!data) throw new Error();
      if (!hubPath && Array.isArray(data)) {
        return data[0] as Hub;
      }
      return data as Hub;
    });
};
