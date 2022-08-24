import type { FooterLink, Hub, Link, LinkGroup } from "@prisma/client";

export interface HubOneConfigType {
  hub: Hub;
  links: Link[];
  linkGroups: LinkGroup[];
  footerLinks: FooterLink[];
}
