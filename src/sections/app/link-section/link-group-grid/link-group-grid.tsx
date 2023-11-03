"use client";

import { useHubOneStore } from "@/lib/Store";
import { Link } from "@/lib/schema/app";
import { AnimatePresence } from "framer-motion";

import LinkAddCard from "@/components/app/link-add-card";
import LinkCard from "@/components/app/link-card";

import { cn } from "@/lib/utils";

export function LinkGroupGrid({
  links,
  hubId,
  linkGroupId,
}: {
  links: Link[];
  hubId: string;
  linkGroupId: number;
}) {
  const editMode = useHubOneStore((state) => state.editMode);
  const compactMode = useHubOneStore((state) => state.compactMode);

  return (
    <div
      className={cn(
        "grid gap-4 w-full grid-cols-4 pb-12",
        compactMode && "grid-cols-4"
      )}
    >
      {links.length === 0 && !editMode && (
        <p className="text-foreground-muted m-auto">
          This Link Group is empty.
        </p>
      )}
      {links.map((link) => (
        <div key={`link_${link.id}`}>
          <LinkCard
            id={link.id}
            title={link.title}
            description={link.description}
            image={link.image}
            link={link.link}
            isInternal={link.isInternal}
            hubId={hubId}
            linkGroupId={linkGroupId}
          />
        </div>
      ))}
      {editMode && (
        <div>
          <AnimatePresence>
            <LinkAddCard hubId={hubId} linkGroupId={linkGroupId} />
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
