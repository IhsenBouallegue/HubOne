import type { Link } from "@prisma/client";

import axios from "../../axios";

export const getLinksByHubId = (hubId: number): Promise<Link[]> => {
  return axios
    .get<Link[]>(`links?hubId=${hubId}`, {
      headers: {
        Accept: "application/json",
      },
    })
    .then(({ data }) => data as Link[]);
};
