import type { Link } from "@prisma/client";

import axios from "../../axios";

export const postLinks = async (link: Partial<Link>) => {
  axios
    .post<Link>("links", link, {
      headers: {
        Accept: "application/json",
      },
    })
    .then((data) => {
      return data;
    })
    .catch((e) => {
      return e;
    });
};
