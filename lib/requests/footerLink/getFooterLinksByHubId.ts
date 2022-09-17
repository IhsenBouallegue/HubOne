import type { FooterLink } from "@prisma/client";

import axios from "../../axios";

export const getFooterLinksByHubId = async (hubId: number) => {
  const { data } = await axios.get<FooterLink[]>(`footerlinks?hubId=${hubId}`, {
    headers: {
      Accept: "application/json",
    },
  });
  return data;
};
