import { useState } from "react";
import { useHubOneStore } from "../../../lib/Store";
import EditLinkModal from "../LinkModals/EditLinkModal";
import CompactLinkCard from "./CompactLinkCard";
import FullLinkCard from "./FullLinkCard";

export default function LinkCard({
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
          isInternal={isInternal}
          setOpened={setOpened}
        />
      ) : (
        <FullLinkCard
          title={title}
          description={description}
          image={image}
          link={link}
          isInternal={isInternal}
          setOpened={setOpened}
        />
      )}
      <EditLinkModal
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
