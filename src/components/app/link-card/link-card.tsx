"use client";

import { useHubOneStore } from "@/lib/Store";
import { Link } from "@/lib/schema/app";
import LinkEditModal from "@/modals/link-modals/link-edit-modal";
import { Dialog } from "@/ui/dialog";
import { useState } from "react";
import { CompactLinkCard } from "./compact-link-card";
import { FullLinkCard } from "./full-link-card";

export function LinkCard({
  id,
  title,
  description,
  image,
  link,
  isInternal = false,
}: Omit<Link, "linkGroupId" | "hubId">) {
  const [opened, setOpened] = useState(false);
  const compactMode = useHubOneStore((state) => state.compactMode);

  return (
    <Dialog open={opened} onOpenChange={setOpened}>
      {compactMode ? (
        <CompactLinkCard
          title={title}
          description={description}
          image={image}
          link={link}
        />
      ) : (
        <FullLinkCard
          title={title}
          description={description}
          image={image}
          link={link}
        />
      )}
      <LinkEditModal
        opened={opened}
        setOpened={setOpened}
        id={id}
        title={title}
        description={description}
        image={image}
        link={link}
        isInternal={isInternal}
      />
    </Dialog>
  );
}
