import type { FooterLink } from "@prisma/client";

import axios from "../../axios";

export const getFooterLinksByHubId = (hubId: number): Promise<FooterLink[]> => {
  return axios
    .get<FooterLink[]>(`footerlinks?hubId=${hubId}`, {
      headers: {
        Accept: "application/json",
      },
    })
    .then(({ data }) => data as FooterLink[]);
};
