import type { Hub } from "@prisma/client";

import axios from "../../axios";

export const postHub = async (linkGroup: Partial<Hub>) => {
  axios
    .post<Hub>("hubs", linkGroup, {
      headers: {
        Accept: "application/json",
      },
    })
    .then((data) => data)
    .catch((e) => e);
};
