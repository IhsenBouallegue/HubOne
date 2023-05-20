import { Container, Grid } from "@mantine/core";
import type { Link } from "@prisma/client";

import { AnimatePresence } from "framer-motion";
import { useHubOneStore } from "../../../lib/Store";
import AddLinkCard from "../../components/AddLinkCard";
import LinkCard from "../../components/LinkCard";

function LinkGroup({
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
    <Container
      size={800}
      sx={(theme) => ({
        padding: "1.875rem 0.2rem 3.75rem 0.2rem",
        margin: "auto",
        [theme.fn.largerThan("lg")]: {
          padding: "4rem 1rem 4rem 1rem",
        },
      })}
    >
      <Grid columns={12} gutter="sm" gutterMd="lg">
        {links.map((link) => (
          <Grid.Col key={`link_${link.id}`} sm={compactMode ? 4 : 3} span={6}>
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
        <Grid.Col sm={compactMode ? 4 : 3} span={6}>
          <AnimatePresence>
            {editMode && (
              <AddLinkCard hubId={hubId} linkGroupId={linkGroupId} />
            )}
          </AnimatePresence>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default LinkGroup;
