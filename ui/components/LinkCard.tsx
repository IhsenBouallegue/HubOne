import {
  Card,
  createStyles,
  Group,
  Image,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { motion } from "framer-motion";
import { Lock } from "tabler-icons-react";

import type { LinkType } from "../types/LinkType";

const useStyles = createStyles((theme) => ({
  card: {
    height: "100%",
    minWidth: "150px",
    margin: "auto",
  },
  title: {
    marginBottom: 5,
    marginTop: theme.spacing.sm,
  },
  image: { padding: 32, minHeight: 160 },
  description: { color: theme.colors.dark[1], lineHeight: 1.5 },
}));

function LinkCard({
  title,
  description,
  image = "./logo/hubone_logo.svg",
  link,
  isInternal = false,
}: LinkType) {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <motion.div
      whileHover={{
        scale: 1.08,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.94 }}
    >
      <Card
        className={classes.card}
        shadow="sm"
        p="lg"
        component="a"
        href={link}
        target="_blank"
      >
        <Card.Section>
          <Image className={classes.image} src={image} alt={title} />
        </Card.Section>

        <Group className={classes.title}>
          {isInternal && (
            <Lock
              size={16}
              strokeWidth={2}
              color={theme.colors.brand[5]}
              style={{ margin: 0, marginRight: -12 }}
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
    </motion.div>
  );
}

export default LinkCard;
