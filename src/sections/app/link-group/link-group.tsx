"use client";

import type { Link } from "@prisma/client";
import { Container, Grid } from "@mantine/core";
import { AnimatePresence } from "framer-motion";
import { useHubOneStore } from "@lib/Store";

import LinkAddCard from "@components/app/link-add-card";
import LinkCard from "@components/app/link-card";

import classes from "./link-group.module.css";

export function LinkGroup({
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
    <Container size={800} className={classes.container}>
      <Grid columns={12} gutter={{ base: "sm", md: "lg" }}>
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
        <Grid.Col span={{ base: 6, sm: compactMode ? 4 : 3 }}>
          <AnimatePresence>
            {editMode && (
              <LinkAddCard hubId={hubId} linkGroupId={linkGroupId} />
            )}
          </AnimatePresence>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
