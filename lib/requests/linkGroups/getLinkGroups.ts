import type { LinkGroup } from "@prisma/client";

import axios from "../../axios";

export default async () => {
  const { data } = await axios.get<{ data: LinkGroup[] }>("linkgroups", {
    headers: {
      Accept: "application/json",
    },
  });
  return data;
};
