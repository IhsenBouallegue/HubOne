import {
  ActionIcon,
  Card,
  createStyles,
  Group,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import type { FooterLink } from "@prisma/client";
import { IconTrash } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useState } from "react";

import { useDelete, useUpdate } from "../../../../lib/useQueries";

function FooterLinkCard({ id, title, link, hubId }: FooterLink) {
  const { classes } = useStyles();
  const [isEditing, setIsEditing] = useState(false);
  const deleteItem = useDelete("footerlinks");
  const updateItem = useUpdate<FooterLink>("footerlinks");
  const [state, setState] = useState({ title, link });

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
      className={classes.card}
    >
      <Card
        className={classes.card}
        shadow="sm"
        p="lg"
        component="a"
        onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
          e.preventDefault();
          setIsEditing(true);
        }}
        onBlur={() => {
          updateItem({ id, hubId, ...state });
          setIsEditing(false);
        }}
      >
        <Group position="apart">
          {isEditing ? (
            <Stack spacing="xs">
              <TextInput
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
              <TextInput
                defaultValue={link}
                id="link"
                onChange={(event) =>
                  setState({ ...state, link: event.currentTarget.value })
                }
                onClick={(
                  e: React.MouseEvent<HTMLInputElement, MouseEvent>
                ) => {
                  e.stopPropagation();
                }}
              />
            </Stack>
          ) : (
            <Stack spacing="sm">
              <Text className={classes.title} weight={600} size="lg">
                {title}
              </Text>
              <Text className={classes.description} size="sm" color="dimmed">
                {link}
              </Text>
            </Stack>
          )}
          <ActionIcon
            size={24}
            color="secondary"
            variant="light"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              e.preventDefault();
              e.stopPropagation();
              deleteItem(id);
            }}
          >
            <IconTrash strokeWidth={2} />
          </ActionIcon>
        </Group>
      </Card>
    </motion.div>
  );
}

const useStyles = createStyles((theme) => ({
  card: {
    width: "100%",
    minHeight: "5rem",
  },
  title: {
    marginTop: theme.spacing.sm,
  },
  description: { color: theme.colors.dark[1] },
}));

export default FooterLinkCard;
