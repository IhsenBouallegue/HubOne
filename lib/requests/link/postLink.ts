import type { Link } from "@prisma/client";

import axios from "../../axios";

export const postLink = async (link: Partial<Link>) => {
  axios
    .post<Link>("links", link, {
      headers: {
        Accept: "application/json",
      },
    })
    .then((data) => data)
    .catch((e) => e);
};
