"use client";

import { useHubOneStore } from "@lib/Store";
import { Link } from "@lib/schema";
import { Grid, Text } from "@mantine/core";
import { AnimatePresence } from "framer-motion";

import LinkAddCard from "@components/app/link-add-card";
import LinkCard from "@components/app/link-card";

import classes from "./link-group-grid.module.css";

export function LinkGroupGrid({
  links,
  hubId,
  linkGroupId,
}: {
  links: Link[];
  hubId: number;
  linkGroupId: number;
}) {
  const editMode = useHubOneStore((state) => state.editMode);
  const compactMode = useHubOneStore((state) => state.compactMode);

  return (
    <Grid
      columns={12}
      gutter={{ base: "sm", md: "lg" }}
      className={classes.container}
    >
      {links.length === 0 && !editMode && (
        <Text c="dimmed" m="auto">
          This Link Group is empty.
        </Text>
      )}
      {links.map((link) => (
        <Grid.Col
          key={`link_${link.id}`}
          span={{ base: 6, sm: compactMode ? 4 : 3 }}
        >
          <LinkCard
            id={link.id}
            title={link.title}
            description={link.description}
            image={link.image}
            link={link.link}
            isInternal={link.isInternal}
          />
        </Grid.Col>
      ))}
      {editMode && (
        <Grid.Col span={{ base: 6, sm: compactMode ? 4 : 3 }}>
          <AnimatePresence>
            <LinkAddCard hubId={hubId} linkGroupId={linkGroupId} />
          </AnimatePresence>
        </Grid.Col>
      )}
    </Grid>
  );
}
