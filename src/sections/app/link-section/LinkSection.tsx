import LinkGroupAddCard from "@/components/app/link-group-add-card";
import { useHubOneStore } from "@/lib/Store";
import { LinkGroup } from "@/lib/schema/app";
import { useFetchByHubId } from "@/lib/useQueries";
import { Container, Text } from "@mantine/core";

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
        {linkGroups && linkGroups?.length > 0 ? (
          <LinkSectionAccordion />
        ) : (
          !editMode && (
            <Text ta="center">
              This Hub is empty. Jump into Edit Mode and start adding your
              Links!
            </Text>
          )
        )}
        {editMode && <LinkGroupAddCard hubId={hubId!} />}
      </Container>
    </div>
  );
}

export default LinkSection;
