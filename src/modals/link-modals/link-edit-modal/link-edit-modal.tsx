"use client";

import { Link } from "@/lib/schema";
import { useDelete, useUpdate } from "@/lib/useQueries";
import { Button, Group, Modal, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { LinkFormFields } from "../link-form-fields";

export function LinkEditModal({
  opened,
  setOpened,
  id,
  title,
  description,
  image,
  link,
  isInternal,
}: {
  opened: boolean;
  setOpened: (open: boolean) => void;
} & Partial<Link>) {
  const form = useForm<Link>({
    initialValues: {
      id,
      title,
      description,
      image,
      isInternal,
      link,
    } as Link,
  });
  const update = useUpdate<Link>("links");
  const deleteItem = useDelete("links");
  const handleSubmit = (values: Link) => {
    if (form.isTouched()) update(values);
    setOpened(false);
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={<Title size="2rem">Edit Link</Title>}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <LinkFormFields form={form} />
        <Group justify="center" mt="xl">
          <Button
            leftSection={<IconTrash />}
            variant="outline"
            color="secondary"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              e.preventDefault();
              deleteItem(id as number);
            }}
          >
            Delete
          </Button>
          <Button variant="filled" type="submit" data-autofocus>
            Save
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
