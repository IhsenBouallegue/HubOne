import { Container, Text } from "@mantine/core";

import { useHubOneContext } from "../../../lib/context/HubOneContext";
import AddLinkGroupCard from "../../components/AddLinkGroupCard";

import LinkSectionAccordion from "./LinkSectionAccordion";
import { useHubOneStore } from "../../../lib/Store";

function LinkSection() {
  const { hub, linkGroups, links } = useHubOneContext();
  const editMode = useHubOneStore((state) => state.editMode);
  return (
    <div id="linkSection">
      <Container size={800} px={0}>
        {linkGroups?.length > 0 ? (
          <LinkSectionAccordion
            linkGroups={linkGroups}
            links={links}
            editMode={editMode}
            hubId={hub.id}
          />
        ) : (
          !editMode && <Text align="center">No links to display.</Text>
        )}
        {editMode && <AddLinkGroupCard hubId={hub.id} />}
      </Container>
    </div>
  );
}

export default LinkSection;
