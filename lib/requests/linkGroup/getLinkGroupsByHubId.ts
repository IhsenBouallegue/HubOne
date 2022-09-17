import type { LinkGroup } from "@prisma/client";

import axios from "../../axios";

export const getLinkGroupsByHubId = async (hubId: number) => {
  const { data } = await axios.get<LinkGroup[]>(`linkgroups?hubId=${hubId}`, {
    headers: {
      Accept: "application/json",
    },
  });
  return data;
};
