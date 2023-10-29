"use client";

import { Icons } from "@/components/icons";
import { Organization } from "@/lib/schema/orgaizations";
import HubSpaceCreateModal from "@/modals/hubspace-modals/hubspace-create-modal";
import { Dialog } from "@/ui/dialog";
import { useState } from "react";

export function HubSpaceAddCard({
  organization,
}: { organization: Organization }) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div
        className="w-72 h-96 border-dashed rounded-md border-2 border-gray-300 flex gap-2 place-items-center place-content-center cursor-pointer"
        onClick={() => setShowDialog(true)}
      >
        <Icons.plus />
        <p>Create HubSpace</p>
      </div>
      <HubSpaceCreateModal
        setShowDialog={setShowDialog}
        organization={organization}
      />
    </Dialog>
  );
}
