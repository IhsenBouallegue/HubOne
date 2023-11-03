"use client";

import { Icons } from "@/components/icons";
import { useHubOneStore } from "@/lib/Store";
import { useDelete } from "@/lib/useQueries";
import { Button } from "@/ui/button";
import { AnimatePresence, motion } from "framer-motion";

export default function AccordionControl({ itemId }: { itemId: number }) {
  const editMode = useHubOneStore((state) => state.editMode);
  const deleteItem = useDelete("linkgroups");
  return (
    <AnimatePresence>
      {editMode && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, transition: { duration: 0.4 }, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{
            scale: 1.08,
          }}
          whileTap={{ scale: 0.94 }}
        >
          <Button
            variant="destructive"
            size="icon"
            onClick={() => deleteItem(itemId)}
          >
            <Icons.trash strokeWidth={2} />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
