import {
  Card,
  createStyles,
  Group,
  Image,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { Lock } from "tabler-icons-react";

import type { LinkType } from "../types/LinkType";

const useStyles = createStyles((theme) => ({
  card: {
    height: "100%",
    margin: "auto",
  },
  title: {
    marginBottom: 5,
    marginTop: theme.spacing.sm,
  },
  description: { color: theme.colors.dark[1], lineHeight: 1.5 },
}));

function LinkCard({
  title,
  description,
  image,
  link,
  isInternal = false,
}: LinkType) {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <Card
      className={classes.card}
      shadow="sm"
      p="lg"
      component="a"
      href={link}
      target="_blank"
    >
      <Card.Section>
        <Image src={image} height={160} alt={title} />
      </Card.Section>

      <Group className={classes.title}>
        {isInternal && (
          <Lock
            size={16}
            strokeWidth={2}
            color={theme.colors.brand[5]}
            style={{ margin: 0 }}
          />
        )}

        <Text weight={600} size="lg">
          {title}
        </Text>
      </Group>

      <Text className={classes.description} size="sm" color="dimmed">
        {description}
      </Text>
    </Card>
  );
}

export default LinkCard;
