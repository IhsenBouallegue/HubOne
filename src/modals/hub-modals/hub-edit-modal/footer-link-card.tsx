"use client";

import { Icons } from "@/components/icons";
import { FooterLink } from "@/lib/schema/app";
import { useDelete, useUpdate } from "@/lib/useQueries";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { Input } from "@/ui/input";
import { motion } from "framer-motion";
import { useState } from "react";

export function FooterLinkCard({
  id,
  title,
  url,
  hubId,
}: Omit<FooterLink, "createdAt">) {
  const deleteItem = useDelete("footerlinks");
  const updateItem = useUpdate<Partial<FooterLink>>("footerlinks");
  const [isEditing, setIsEditing] = useState(false);
  const [state, setState] = useState({ title, url });

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className="cursor-pointer p-6 w-full h-32"
        onClick={(e) => {
          e.preventDefault();
          setIsEditing(true);
        }}
        onBlur={() => {
          updateItem({ id, hubId, ...state });
          setIsEditing(false);
        }}
      >
        <div className="flex w-full justify-between">
          {isEditing ? (
            <div className="space-y-2">
              <Input
                defaultValue={title}
                id="title"
                onChange={(event) =>
                  setState({ ...state, title: event.currentTarget.value })
                }
                onClick={(
                  e: React.MouseEvent<HTMLInputElement, MouseEvent>
                ) => {
                  e.stopPropagation();
                }}
              />
              <Input
                defaultValue={url}
                id="link"
                onChange={(event) =>
                  setState({ ...state, url: event.currentTarget.value })
                }
                onClick={(
                  e: React.MouseEvent<HTMLInputElement, MouseEvent>
                ) => {
                  e.stopPropagation();
                }}
              />
            </div>
          ) : (
            <div className="space-y-2">
              <p className="font-semibold text-lg">{title}</p>
              <p className="text-muted-foreground">{url}</p>
            </div>
          )}
          <Button
            size="icon"
            variant="destructive"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              e.preventDefault();
              e.stopPropagation();
              deleteItem(id);
            }}
          >
            <Icons.trash strokeWidth={2} />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
