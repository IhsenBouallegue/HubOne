import type { Hub } from "@prisma/client";

import axios from "../../axios";

export default async () => {
  const { data } = await axios.get<Hub[]>("hubs", {
    headers: {
      Accept: "application/json",
    },
  });
  return data;
};
