import type { LinkGroup } from "@prisma/client";

import axios from "../../axios";

export const getLinkGroupsByHubId = (hubId: number): Promise<LinkGroup[]> => {
  return axios
    .get<LinkGroup[]>(`linkgroups?hubId=${hubId}`, {
      headers: {
        Accept: "application/json",
      },
    })
    .then(({ data }) => data as LinkGroup[]);
};
