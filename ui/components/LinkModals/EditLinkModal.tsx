import { Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { Link } from "@prisma/client";

import { useUpdate } from "../../../lib/useQueries";

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
  const form = useForm<Partial<Link>>({
    initialValues: {
      id,
      title,
      description,
      image,
      isInternal,
      link,
    },
  });
  type FormValues = typeof form.values;
  const update = useUpdate<Link>("links");
  const handleSubmit = (values: FormValues) => {
    update({ newItem: values as Link, itemId: id as number });
    form.reset();
    setOpened(false);
  };

  return (
    <Modal opened={opened} onClose={() => setOpened(false)} title="Edit link">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <LinkFormFields form={form} />
      </form>
    </Modal>
  );
}

export default EditLinkModal;
