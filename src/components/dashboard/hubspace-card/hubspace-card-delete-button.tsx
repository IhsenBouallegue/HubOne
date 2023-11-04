"use client";

import { Icons } from "@/components/icons";
import { deleteHubSpace } from "@/modals/hubspace-modals/hubspace-create-modal/hubspace.actions";
import { Button } from "@/ui/button";

export default function HubSpaceCardDeleteButton({
  id,
  ownerId,
}: { id: string; ownerId: string }) {
  const deleteHubSpaceWithId = deleteHubSpace.bind(null, id, ownerId);
  return (
    <form action={deleteHubSpaceWithId}>
      <Button type="submit" variant="destructive" size="sm">
        <Icons.trash className="mr-2 h-4 w-4" />
        Delete
      </Button>
    </form>
  );
}
