import { Container, Text } from "@mantine/core";

import { useHubOneContext } from "../../../lib/context/HubOneContext";
import AddLinkGroupCard from "../../components/AddLinkGroupCard";

import LinkSectionAccordion from "./LinkSectionAccordion";

function EmptyLinkSection({
  editMode,
  hubId,
}: {
  editMode: boolean;
  hubId: number;
}) {
  return editMode ? (
    <AddLinkGroupCard hubId={hubId} />
  ) : (
    <Text align="center">No links to display.</Text>
  );
}

function LinkSection() {
  const { editMode, hub, linkGroups, links } = useHubOneContext();

  return (
    <div id="linkSection">
      <Container size={800} px={0}>
        {linkGroups && linkGroups.length > 0 ? (
          <LinkSectionAccordion
            linkGroups={linkGroups}
            links={links}
            editMode={editMode}
            hubId={hub.id}
          />
        ) : (
          <EmptyLinkSection editMode={editMode} hubId={hub.id} />
        )}
      </Container>
    </div>
  );
}

export default LinkSection;
