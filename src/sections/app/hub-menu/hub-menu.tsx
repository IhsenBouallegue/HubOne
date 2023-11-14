"use client";

import HubLogo from "@/components/app/hub-logo";
import { Icons } from "@/components/icons";
import { Hub } from "@/lib/schema/app";
import HubCreateModal from "@/modals/hub-modals/hub-create-modal";
import { Button } from "@/ui/button";
import { Dialog, DialogTrigger } from "@/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import Link from "next/link";
import { useState } from "react";

export function HubMenu({ hubs }: { hubs: Hub[] }) {
  const [createModalOpened, setCreateModalOpened] = useState(false);

  return (
    <Dialog open={createModalOpened} onOpenChange={setCreateModalOpened}>
      <DropdownMenu>
        <div className="fixed bottom-6 right-6">
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="default">
              <Icons.hubs />
            </Button>
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent collisionPadding={{ right: 24 }} sideOffset={16}>
          <DropdownMenuLabel className="text-lg mb-4">
            Hub Menu
          </DropdownMenuLabel>
          <div className="grid grid-cols-3 gap-4">
            {hubs.map((hub) => (
              <DropdownMenuItem className="p-2" key={`hub_menu_item_${hub.id}`}>
                <Link href={hub.slug}>
                  <div className="flex flex-col h-32 w-16">
                    <div className="w-full h-1/2 p-1">
                      <div className="absolute h-14 w-14 overflow-hidden rounded-md">
                        <HubLogo hub={hub} />
                      </div>
                    </div>
                    <div className="w-full h-1/2">
                      <p className="text-sm text-center line-clamp-3">
                        {hub.name}
                      </p>
                    </div>
                  </div>
                </Link>
              </DropdownMenuItem>
            ))}
          </div>
          <DropdownMenuSeparator className="bg-black/50" />
          <DialogTrigger asChild>
            <DropdownMenuItem className="flex gap-2">
              <Icons.plus size={14} />
              Create New Hub
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <HubCreateModal setOpened={setCreateModalOpened} />
    </Dialog>
  );
}
