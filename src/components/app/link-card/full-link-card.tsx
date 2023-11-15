import { Icons } from "@/components/icons";
import { useHubOneStore } from "@/lib/Store";
import { Link } from "@/lib/schema/app";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { NormalOrEditInjector } from "./link-card";

export function FullLinkCard({
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
        transition: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 0.4,
          ease: "easeInOut",
        },
      });
    else {
      controls.set({ rotate: 0 });
      controls.stop();
    }
  }, [editMode, controls]);
  return (
    <motion.div
      whileHover={{
        scale: 1.08,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.94 }}
      animate={controls}
      style={{ height: "100%" }}
    >
      <NormalOrEditInjector url={url}>
        <Card className="cursor-pointer w-52 h-64 p-4 relative flex flex-col gap-4">
          {editMode && (
            <div className="absolute top-2 right-2">
              <Button variant="ghost" size="icon">
                <Icons.edit strokeWidth={2} />
              </Button>
            </div>
          )}

          <div className="h-1/2 relative">
            <Image
              className="p-4"
              fill
              src={!image || image === "" ? "./logo/hubone_logo.svg" : image}
              alt={title}
            />
          </div>
          <div className="h-1/2 flex flex-col gap-2">
            <p className="text-lg font-semibold leading-5">{title}</p>
            <p className="text-muted-foreground line-clamp-4">{description}</p>
          </div>
        </Card>
      </NormalOrEditInjector>
    </motion.div>
  );
}
