"use client";

import { useHubOneStore } from "@/lib/Store";
import HubEditModal from "@/modals/hub-modals/hub-edit-modal";
import { Button } from "@/ui/button";
import { Toggle } from "@/ui/toggle";
import { IconArrowsMaximize, IconSettings } from "@tabler/icons-react";
import { useState } from "react";

export function HeaderActions() {
  const editMode = useHubOneStore((state) => state.editMode);
  const compactMode = useHubOneStore((state) => state.compactMode);
  const setCompactMode = useHubOneStore((state) => state.setCompactMode);

  const [editModalOpened, setEditModalOpened] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <Toggle
        variant={compactMode ? "default" : "outline"}
        pressed={compactMode}
        onPressedChange={(pressed) => setCompactMode(pressed)}
      >
        <IconArrowsMaximize size={20} stroke={2.5} />
      </Toggle>

      {editMode ? (
        <div className="ml-auto mr-12">
          <Button onClick={() => setEditModalOpened(true)}>
            <IconSettings />
          </Button>
        </div>
      ) : (
        <div className="hidden sm:flex">
          <Button>Browse Links</Button>
        </div>
      )}
      <HubEditModal opened={editModalOpened} setOpened={setEditModalOpened} />
    </div>
  );
}
