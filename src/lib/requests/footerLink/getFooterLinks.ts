import type { FooterLink } from "@prisma/client";

import axios from "../../axios";

export const getFooterLinks = async () => {
  const { data } = await axios.get<FooterLink[]>("footerlinks", {
    headers: {
      Accept: "application/json",
    },
  });
  return data;
};
