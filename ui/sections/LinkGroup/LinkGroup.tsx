import { Container, createStyles, Grid } from "@mantine/core";

import LinkCard from "../../components/LinkCard";
import type { LinkType } from "../../types/LinkType";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    boxSizing: "border-box",
    backgroundColor: theme.white,
  },
  inner: {
    position: "relative",
    paddingTop: 200,
    paddingBottom: 120,
    margin: "auto",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      paddingBottom: 80,
      paddingTop: 80,
    },
  },
}));

interface LinkGroupType {
  links: LinkType[];
}

function LinkGroup({ links }: LinkGroupType) {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <Grid columns={4}>
          {links.map((link) => (
            <Grid.Col span={1}>
              <LinkCard {...link} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default LinkGroup;
