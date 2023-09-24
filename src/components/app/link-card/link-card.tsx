"use client";

import { useHubOneStore } from "@lib/Store";
import LinkEditModal from "@modals/link-modals/link-edit-modal";
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
}: {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  isInternal: boolean;
}) {
  const [opened, setOpened] = useState(false);
  const compactMode = useHubOneStore((state) => state.compactMode);

  return (
    <>
      {compactMode ? (
        <CompactLinkCard
          title={title}
          description={description}
          image={image}
          link={link}
          setOpened={setOpened}
        />
      ) : (
        <FullLinkCard
          title={title}
          description={description}
          image={image}
          link={link}
          setOpened={setOpened}
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
    </>
  );
}
