import { Button, Group, Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { Link } from "@prisma/client";

import { usePost } from "../../../lib/useQueries";

import LinkFormFields from "./LinkFormFields";

function AddLinkModal({
  opened,
  setOpened,
  hubId,
  linkGroupId,
}: {
  opened: boolean;
  setOpened: (open: boolean) => void;
} & Partial<Link>) {
  const form = useForm<Link>({
    initialValues: {
      title: "",
      description: "",
      image: "",
      isInternal: false,
      link: "",
      hubId,
      linkGroupId,
    } as Link,
  });
  const mutate = usePost<Link>("links");
  const handleSubmit = (values: Link) => {
    mutate(values);
    form.reset();
    setOpened(false);
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Add new link"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <LinkFormFields form={form} />
        <Group position="center" mt="xl">
          <Button variant="filled" type="submit">
            Save
          </Button>
        </Group>
      </form>
    </Modal>
  );
}

export default AddLinkModal;
