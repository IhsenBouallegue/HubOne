"use client";

import { useHubOneStore } from "@/lib/Store";
import { LinkGroup } from "@/lib/schema/app";
import { useUpdate } from "@/lib/useQueries";
import { Input } from "@/ui/input";
import { AnimatePresence, motion } from "framer-motion";

export default function AccordionLabel({ id, title, hubId }: LinkGroup) {
  const editMode = useHubOneStore((state) => state.editMode);
  const updateLinkGroup = useUpdate<Partial<LinkGroup>>("linkgroups");
  return (
    <div style={{ height: "3em", alignItems: "center" }}>
      <AnimatePresence>
        {editMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ transition: { duration: 0.4 }, opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ width: "100%" }}
          >
            <Input
              className="text-2xl h-12"
              defaultValue={title}
              id={title}
              onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
                e.stopPropagation();
              }}
              onBlur={(event) =>
                updateLinkGroup({
                  id,
                  title: event.currentTarget.value,
                  hubId,
                })
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
      {!editMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ transition: { duration: 0.4, delay: 0.4 }, opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <h2 className="text-3xl font-bold" id={title}>
            {title}
          </h2>
        </motion.div>
      )}
    </div>
  );
}
