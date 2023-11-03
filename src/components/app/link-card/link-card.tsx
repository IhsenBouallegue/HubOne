"use client";

import { useHubOneStore } from "@/lib/Store";
import { Link as ILink } from "@/lib/schema/app";
import LinkEditModal from "@/modals/link-modals/link-edit-modal";
import { Dialog, DialogTrigger } from "@/ui/dialog";
import Link from "next/link";
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
  linkGroupId,
  hubId,
}: ILink) {
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
        linkGroupId={linkGroupId}
        hubId={hubId}
      />
    </Dialog>
  );
}

export function NormalOrEditInjector({
  children,
  link,
}: { children: React.ReactNode[] | React.ReactNode; link: string }) {
  const editMode = useHubOneStore((state) => state.editMode);
  if (editMode) return <DialogTrigger asChild>{children}</DialogTrigger>;
  else
    return (
      <Link href={link} target="_blank">
        {children}
      </Link>
    );
}
