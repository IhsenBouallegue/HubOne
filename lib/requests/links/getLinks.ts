import type { Link } from "@prisma/client";

import axios from "../../axios";

export default async () => {
  const { data } = await axios.get<Link[]>("links", {
    headers: {
      Accept: "application/json",
    },
  });
  return data;
};