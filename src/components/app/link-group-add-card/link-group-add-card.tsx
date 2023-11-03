"use client";

import { Icons } from "@/components/icons";
import AddLinkGroupModal from "@/modals/link-group-modal";
import { Card } from "@/ui/card";
import { Dialog, DialogTrigger } from "@/ui/dialog";
import { motion } from "framer-motion";
import { useState } from "react";

export function LinkGroupAddCard({ hubId }: { hubId: string }) {
  const [open, setOpened] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1, transition: { duration: 0.2 } }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.94 }}
    >
      <Dialog open={open} onOpenChange={setOpened}>
        <DialogTrigger asChild>
          <Card
            className="cursor-pointer w-full h-24 flex items-center justify-center"
            onClick={() => setOpened(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setOpened(true);
              }
            }}
          >
            <div className="flex justify-center items-center gap-4">
              <Icons.plus size={32} />
              <p className="text-center">Create Link Group</p>
            </div>
          </Card>
        </DialogTrigger>
        <AddLinkGroupModal setOpened={setOpened} hubId={hubId} />
      </Dialog>
    </motion.div>
  );
}
