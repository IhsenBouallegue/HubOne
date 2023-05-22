import LinkGroupAddCard from "@components/link-group-add-card";
import { useHubOneStore } from "@lib/Store";
import { Container, Text } from "@mantine/core";

import LinkSectionAccordion from "./accordion";

function LinkSection() {
  const editMode = useHubOneStore((state) => state.editMode);
  const hub = useHubOneStore((state) => state.hub);
  const linkGroups = useHubOneStore((state) => state.linkGroups);
  const links = useHubOneStore((state) => state.links);

  return (
    <div id="linkSection">
      <Container
        size={800}
        px={0}
        sx={{ gap: "2em", display: "flex", flexDirection: "column" }}
      >
        {linkGroups?.length > 0 ? (
          <LinkSectionAccordion
            linkGroups={linkGroups}
            links={links}
            hubId={hub.id}
          />
        ) : (
          !editMode && <Text align="center">No links to display.</Text>
        )}
        {editMode && <LinkGroupAddCard hubId={hub.id} />}
      </Container>
    </div>
  );
}

export default LinkSection;
