"use client";

import { Icons } from "@/components/icons";
import LinkCreateModal from "@/modals/link-modals/link-create-modal";
import { Card } from "@/ui/card";
import { Dialog } from "@/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { useState } from "react";

export function LinkAddCard({
  hubId,
  linkGroupId,
}: {
  hubId: string;
  linkGroupId: number;
}) {
  const [opened, setOpened] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, transition: { duration: 0.4 }, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{
        scale: 1.08,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.94 }}
      style={{ height: "100%" }}
    >
      <Dialog open={opened} onOpenChange={setOpened}>
        <DialogTrigger asChild>
          <Card className="cursor-pointer h-full min-h-[250px]">
            <div className="flex flex-col h-full w-full gap-4 justify-center items-center">
              <Icons.plus size={36} />
              <p className="text-center">Add Link</p>
            </div>
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
