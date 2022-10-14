import { Button, Group, Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { Link } from "@prisma/client";
import { Trash } from "tabler-icons-react";

import { useDelete, useUpdate } from "../../../lib/useQueries";

import LinkFormFields from "./LinkFormFields";

function EditLinkModal({
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
    update(values);
    setOpened(false);
  };

  return (
    <Modal opened={opened} onClose={() => setOpened(false)} title="Edit link">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <LinkFormFields form={form} />
        <Group position="center" mt="xl">
          <Button
            leftIcon={<Trash />}
            variant="outline"
            type="submit"
            color="secondary"
            onClick={() => deleteItem(id as number)}
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

export default EditLinkModal;
