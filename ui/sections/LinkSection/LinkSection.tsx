import { Container, Text } from "@mantine/core";

import { useHubOneContext } from "../../../lib/context/HubOneContext";
import AddLinkGroupCard from "../../components/AddLinkGroupCard";

import LinkSectionAccordion from "./LinkSectionAccordion";

function LinkSection() {
  const { editMode, hub, linkGroups, links } = useHubOneContext();

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
