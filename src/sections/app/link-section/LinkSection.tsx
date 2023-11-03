import LinkGroupAddCard from "@/components/app/link-group-add-card";
import { useHubOneStore } from "@/lib/Store";
import { LinkGroup } from "@/lib/schema/app";
import { useFetchByHubId } from "@/lib/useQueries";

import LinkSectionAccordion from "./accordion";

function LinkSection() {
  const editMode = useHubOneStore((state) => state.editMode);
  const hubId = useHubOneStore((state) => state.hubId);
  const { data: linkGroups } = useFetchByHubId<LinkGroup>("linkgroups", hubId!);

  return (
    <div
      id="linkSection"
      className="max-w-screen-lg mx-auto w-full px-4 sm:px-6 lg:px-8"
      style={{ gap: "2em", display: "flex", flexDirection: "column" }}
    >
      {linkGroups && linkGroups?.length > 0 ? (
        <LinkSectionAccordion />
      ) : (
        !editMode && (
          <p className="text-center">
            This Hub is empty. Jump into <strong>Edit Mode</strong> and start
            adding your Links!
          </p>
        )
      )}
      {editMode && <LinkGroupAddCard hubId={hubId!} />}
    </div>
  );
}

export default LinkSection;
