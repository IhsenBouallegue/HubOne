import type { Link } from "@prisma/client";

import axios from "../../axios";

export const getLinksByHubId = async (hubId: number) => {
  const { data } = await axios.get<Link[]>(`links?hubId=${hubId}`, {
    headers: {
      Accept: "application/json",
    },
  });
  return data;
};
