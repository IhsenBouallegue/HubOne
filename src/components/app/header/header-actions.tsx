"use client";

import { Icons } from "@/components/icons";
import { useHubOneStore } from "@/lib/Store";
import HubEditModal from "@/modals/hub-modals/hub-edit-modal";
import { Button } from "@/ui/button";
import { Dialog, DialogTrigger } from "@/ui/dialog";
import { Toggle } from "@/ui/toggle";
import { useState } from "react";

export function HeaderActions() {
  const editMode = useHubOneStore((state) => state.editMode);
  const compactMode = useHubOneStore((state) => state.compactMode);
  const setCompactMode = useHubOneStore((state) => state.setCompactMode);

  const [editModalOpened, setEditModalOpened] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <Dialog open={editModalOpened} onOpenChange={setEditModalOpened}>
        <Toggle
          variant={compactMode ? "default" : "ghost"}
          pressed={compactMode}
          title="Compact Mode"
          onPressedChange={(pressed) => setCompactMode(pressed)}
        >
          {compactMode ? (
            <Icons.maximise size={20} stroke={2.5} />
          ) : (
            <Icons.minimise size={20} stroke={2.5} />
          )}
        </Toggle>

        {editMode ? (
          <DialogTrigger asChild>
            <Button className="flex gap-2">
              <Icons.settings size={20} />
              Settings
            </Button>
          </DialogTrigger>
        ) : (
          <Button className="hidden sm:flex">Browse Links</Button>
        )}
        <HubEditModal setOpened={setEditModalOpened} />
      </Dialog>
    </div>
  );
}
