"use client";

import { FooterLink } from "@lib/schema";
import { useDelete, useUpdate } from "@lib/useQueries";
import { ActionIcon, Card, Group, Stack, Text, TextInput } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useState } from "react";

export function FooterLinkCard({ id, title, link, hubId }: FooterLink) {
  const deleteItem = useDelete("footerlinks");
  const updateItem = useUpdate<FooterLink>("footerlinks");
  const [isEditing, setIsEditing] = useState(false);
  const [state, setState] = useState({ title, link });

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        shadow="sm"
        p="lg"
        w="100%"
        mih="5rem"
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
        <Group align="apart">
          {isEditing ? (
            <Stack gap="xs">
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
            <Stack gap="sm">
              <Text mt="sm" fw={600} size="lg">
                {title}
              </Text>
              <Text size="sm" color="dimmed">
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
