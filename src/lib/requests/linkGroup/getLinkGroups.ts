import type { LinkGroup } from "@prisma/client";

import axios from "../../axios";

export const getLinkGroups = async () => {
  const { data } = await axios.get<LinkGroup[]>("linkgroups", {
    headers: {
      Accept: "application/json",
    },
  });
  return data;
};
