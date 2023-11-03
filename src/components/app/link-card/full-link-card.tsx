import { Icons } from "@/components/icons";
import { useHubOneStore } from "@/lib/Store";
import { Link as ILink } from "@/lib/schema/app";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export function FullLinkCard({
  title,
  description,
  image,
  link,
}: Pick<ILink, "title" | "description" | "image" | "link">) {
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
      <Link href={link} target="_blank">
        <DialogTrigger asChild>
          <Card className="cursor-pointer w-56 p-4 relative flex flex-col gap-4">
            {editMode && (
              <div className="absolute top-2 right-2">
                <Button variant="ghost" size="icon">
                  <Icons.edit strokeWidth={2} />
                </Button>
              </div>
            )}

            <div className="h-32 relative">
              <Image
                className="p-4"
                fill
                src={!image || image === "" ? "./logo/hubone_logo.svg" : image}
                alt={title}
              />
            </div>
            <div className="flex h-32 flex-col gap-2">
              <p className="text-lg font-semibold leading-5">{title}</p>
              <p className=" text-muted-foreground">{description}</p>
            </div>
          </Card>
        </DialogTrigger>
      </Link>
    </motion.div>
  );
}
