"use client";

import { Icons } from "@/components/icons";
import { useHubOneStore } from "@/lib/Store";
import { Link } from "@/lib/schema/app";
import { cn } from "@/lib/utils";
import LinkCreateModal from "@/modals/link-modals/link-create-modal";
import { Card } from "@/ui/card";
import { Dialog } from "@/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { useState } from "react";

export function LinkAddCard({
  hubId,
  linkGroupId,
}: Pick<Link, "linkGroupId" | "hubId">) {
  const [opened, setOpened] = useState(false);
  const compactMode = useHubOneStore((state) => state.compactMode);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, transition: { duration: 0.4 }, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{
        scale: 1.04,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.94 }}
      style={{ height: "100%" }}
    >
      <Dialog open={opened} onOpenChange={setOpened}>
        <DialogTrigger asChild>
          <Card
            className={cn(
              "cursor-pointer flex flex-col h-full gap-4 justify-center items-center min",
              compactMode
                ? "flex-row min-h-[4rem] w-52"
                : "flex-col min-h-[16rem] w-52"
            )}
          >
            <Icons.plus size={36} />
            <p className="text-center">Create Link</p>
          </Card>
        </DialogTrigger>
        <LinkCreateModal
          setOpened={setOpened}
          hubId={hubId}
          linkGroupId={linkGroupId}
        />
      </Dialog>
    </motion.div>
  );
}
