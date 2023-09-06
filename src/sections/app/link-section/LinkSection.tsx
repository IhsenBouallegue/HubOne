import LinkGroupAddCard from "@components/app/link-group-add-card";
import { useHubOneStore } from "@lib/Store";
import { useFetchByHubId } from "@lib/useQueries";
import { Container, Text } from "@mantine/core";
import type { LinkGroup } from "@prisma/client";

import LinkSectionAccordion from "./accordion";

function LinkSection() {
  const editMode = useHubOneStore((state) => state.editMode);
  const hubId = useHubOneStore((state) => state.hubId);
  const { data: linkGroups } = useFetchByHubId<LinkGroup>("linkgroups", hubId!);

  return (
    <div id="linkSection">
      <Container
        size={800}
        px={0}
        style={{ gap: "2em", display: "flex", flexDirection: "column" }}
      >
        {linkGroups!?.length > 0 ? (
          <LinkSectionAccordion />
        ) : (
          !editMode && <Text ta="center">No links to display.</Text>
        )}
        {editMode && <LinkGroupAddCard hubId={hubId!} />}
      </Container>
    </div>
  );
}

export default LinkSection;
