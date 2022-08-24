import type { GeneralSettings } from "@prisma/client";

import axios from "../../axios";

export default async () => {
  const { data } = await axios.get<GeneralSettings[]>("generalsettings", {
    headers: {
      Accept: "application/json",
    },
  });
  return data;
};
