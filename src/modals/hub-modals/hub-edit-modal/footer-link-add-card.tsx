"use client";

import { Icons } from "@/components/icons";
import { FooterLink } from "@/lib/schema/app";
import { usePost } from "@/lib/useQueries";
import { Card } from "@/ui/card";
import { motion } from "framer-motion";

export function FooterLinkAddCard({ hubId }: { hubId: string }) {
  const mutate = usePost<FooterLink>("footerlinks");
  const handleSubmit = () => {
    mutate({ hubId, title: "change me", url: "/" } as FooterLink);
  };
  return (
    <motion.div
      whileHover={{
        scale: 1.04,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
      onClick={handleSubmit}
    >
      <Card className="p-3 h-14 flex gap-4 items-center">
        <Icons.plus />
        <p>Add Footer Link</p>
      </Card>
    </motion.div>
  );
}
