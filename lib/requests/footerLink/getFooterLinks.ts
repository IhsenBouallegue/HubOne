import type { FooterLink } from "@prisma/client";

import axios from "../../axios";

export default async () => {
  const { data } = await axios.get<FooterLink[]>("footerlinks", {
    headers: {
      Accept: "application/json",
    },
  });
  return data;
};
