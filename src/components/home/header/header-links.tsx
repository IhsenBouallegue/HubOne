import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SetStateAction } from "react";

export function HeaderLinks({
  toggleOpened,
}: {
  toggleOpened: (value?: SetStateAction<boolean> | undefined) => void;
}) {
  return (
    <>
      {headerLinks.map((linkGroup) => (
        <Link
          href={linkGroup.link}
          className={cn(buttonVariants({ variant: "link" }))}
          onClick={() => {
            toggleOpened(false);
          }}
        >
          {linkGroup.label}
        </Link>
      ))}
    </>
  );
}

export const headerLinks = [
  {
    link: "#features",
    label: "Features",
  },
  {
    link: "#pricing",
    label: "Pricing",
  },
  {
    link: "#contact",
    label: "Contact",
  },
];
