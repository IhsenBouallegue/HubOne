import { Container, createStyles, Grid } from "@mantine/core";
import type { Link } from "@prisma/client";

import LinkCard from "../../components/LinkCard";

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

function LinkGroup({ links }: { links: Link[] }) {
  const { classes } = useStyles();

  return (
    <Container size={700} className={classes.inner}>
      <Grid columns={4}>
        {links.map((link) => (
          <Grid.Col key={`link_${link.title}`} span={2} xs={1}>
            <LinkCard {...link} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}

export default LinkGroup;
