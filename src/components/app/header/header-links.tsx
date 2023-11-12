import { useHubOneStore } from "@/lib/Store";
import { LinkGroup } from "@/lib/schema/app";
import { useFetchByHubId } from "@/lib/useQueries";
import { buttonVariants } from "@/ui/button";
import Link from "next/link";

export function HeaderLinks({
  toggleMenu,
}: {
  toggleMenu: () => void;
}) {
  const { data: linkGroups } = useFetchByHubId<LinkGroup>(
    "linkgroups",
    useHubOneStore((state) => state.hubId)!
  );
  if (!linkGroups || linkGroups.length === 0) return null;

  return (
    <div className="justify-center items-center space-y-8 space-x-4 md:flex md:space-x-6 md:space-y-0">
      {linkGroups?.map((linkGroup) => (
        <Link
          href={`#${linkGroup.id.toString()}`}
          className={buttonVariants({ variant: "light" })}
          key={`header_link_${linkGroup.id}`}
          onClick={toggleMenu}
        >
          {linkGroup.title}
        </Link>
      ))}
    </div>
  );
}
