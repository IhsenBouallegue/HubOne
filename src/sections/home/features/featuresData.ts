import {
  IconBrandOpenSource,
  IconSquareRounded,
  IconUsers,
  Icon,
} from "@tabler/icons-react";

export const featuresData: {
  title: string;
  description: string;
  icon: Icon;
}[] = [
  {
    title: "Simplicity",
    description:
      "HubOne is simple by design. We make sure you can access your links asap, and see everything at a glance. This is not a dashboard to launch a rocket.",
    icon: IconSquareRounded,
  },
  {
    title: "Open Source",
    description:
      "It is available to everyone! HubOne solves a problem we personally struggled with. So it is crucial to us to help everyone we can.",
    icon: IconBrandOpenSource,
  },
  {
    title: "Team Managed",
    description:
      "HubOne differes from the alternatives by elevating the power of the team. Every update to the Hub benefits everyone in the whole team.",
    icon: IconUsers,
  },
];
export default featuresData;
