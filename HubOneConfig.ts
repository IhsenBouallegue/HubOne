import type { LinkGroupType } from "./ui/types/LinkGroupType";

export interface HubOneConfigType {
  companyLogo: string;
  heading: string;
  linkGroups: LinkGroupType[];
}

const linkGroup0: LinkGroupType = {
  title: "Link Group 1",
  links: [
    {
      title: "1. Website",
      description: "Description",
      image: undefined,
      link: "",
      isInternal: true,
    },
    {
      title: "2. Website",
      description: "Description",
      image: undefined,
      link: "",
      isInternal: true,
    },
    {
      title: "3. Website",
      description: "Description",
      image: undefined,
      link: "",
      isInternal: true,
    },
  ],
};

const linkGroup1: LinkGroupType = {
  title: "Link Group 2",
  links: [
    {
      title: "1. Website",
      description: "Description",
      image: undefined,
      link: "",
      isInternal: true,
    },
    {
      title: "2. Website",
      description: "Description",
      image: undefined,
      link: "",
      isInternal: true,
    },
    {
      title: "3. Website",
      description: "Description",
      image: undefined,
      link: "",
      isInternal: true,
    },
    {
      title: "4. Website",
      description: "Description",
      image: undefined,
      link: "",
      isInternal: false,
    },
    {
      title: "5. Website",
      description: "Description",
      image: undefined,
      link: "",
      isInternal: false,
    },
  ],
};

export const hubOneConfig: HubOneConfigType = {
  companyLogo: "/logo/hubone_logo.svg",
  heading: "company",
  linkGroups: [linkGroup0, linkGroup1],
};

export default hubOneConfig;
