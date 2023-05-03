import { Container, createStyles, Grid } from "@mantine/core";
import type { Link } from "@prisma/client";

import AddLinkCard from "../../components/AddLinkCard";
import LinkCard from "../../components/LinkCard";
import { useHubOneStore } from "../../../lib/Store";

const useStyles = createStyles((theme) => ({
  inner: {
    paddingTop: 30,
    paddingBottom: 60,
    margin: "auto",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      paddingBottom: 80,
      paddingTop: 80,
    },
  },
}));

function LinkGroup({
  links,
  hubId,
  linkGroupId,
}: {
  links: Link[];
  hubId: number;
  linkGroupId: number;
}) {
  const { classes } = useStyles();
  const editMode = useHubOneStore((state) => state.editMode);

  return (
    <Container size={700} className={classes.inner}>
      <Grid columns={4}>
        {links.map((link) => (
          <Grid.Col key={`link_${link.id}`} span={2} xs={1}>
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
        <Grid.Col span={2} xs={1}>
          {editMode && <AddLinkCard hubId={hubId} linkGroupId={linkGroupId} />}
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default LinkGroup;
