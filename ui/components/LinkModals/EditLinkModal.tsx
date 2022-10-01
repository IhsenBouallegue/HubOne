import { Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { Link } from "@prisma/client";

import LinkFormFields from "./LinkFormFields";

function EditLinkModal({
  opened,
  setOpened,
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
      title,
      description,
      image,
      isInternal,
      link,
    },
  });
  type FormValues = typeof form.values;
  // eslint-disable-next-line no-console
  const handleSubmit = (values: FormValues) => console.log(values);

  return (
    <Modal opened={opened} onClose={() => setOpened(false)} title="Edit link">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <LinkFormFields form={form} />
      </form>
    </Modal>
  );
}

export default EditLinkModal;
