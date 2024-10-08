import { Icons } from "@/components/icons";
import { useHubOneStore } from "@/lib/Store";
import { Link } from "@/lib/schema/app";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { NormalOrEditInjector } from "./link-card";

export function CompactLinkCard({
  title,
  description,
  image,
  url,
}: Pick<Link, "title" | "description" | "image" | "url">) {
  const editMode = useHubOneStore((state) => state.editMode);
  const controls = useAnimationControls();

  useEffect(() => {
    if (editMode)
      controls.start({
        rotate: [2, -2],
        transition: { repeat: Infinity, repeatType: "reverse", duration: 0.4 },
      });
    else {
      controls.set({ rotate: 0 });
      controls.stop();
    }
  }, [editMode, controls]);
  return (
    <motion.div
      whileHover={{
        scale: 1.04,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.94 }}
      animate={controls}
      style={{ height: "100%" }}
    >
      <NormalOrEditInjector url={url}>
        <Card className="cursor-pointer h-20 p-4 relative flex gap-4">
          {editMode && (
            <div className="absolute top-2 right-2">
              <Button variant="ghost" size="icon">
                <Icons.edit strokeWidth={2} size={16} />
              </Button>
            </div>
          )}
          <div className="flex w-1/4">
            <Image
              width={32}
              height={32}
              src={!image || image === "" ? "./logo/hubone_logo.svg" : image}
              alt={title}
            />
          </div>
          <div className="flex w-3/4 flex-col gap-2">
            <p className="font-semibold leading-5">{title}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </Card>
      </NormalOrEditInjector>
    </motion.div>
  );
}
