import type { LinkGroup } from "@prisma/client";

import axios from "../../axios";

export const postLinkGroup = async (linkGroup: Partial<LinkGroup>) => {
  axios
    .post<LinkGroup>("linkgroups", linkGroup, {
      headers: {
        Accept: "application/json",
      },
    })
    .then((data) => data)
    .catch((e) => e);
};
