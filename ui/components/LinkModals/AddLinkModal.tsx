import { Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { Link } from "@prisma/client";

import LinkFormFields from "./LinkFormFields";

function AddLinkModal({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: (open: boolean) => void;
}) {
  const form = useForm<Partial<Link>>({
    initialValues: {
      title: "",
      description: "",
      image: "",
      isInternal: false,
      link: "",
    },
  });
  type FormValues = typeof form.values;
  const handleSubmit = (values: FormValues) => console.log(values);

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Add new link"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <LinkFormFields form={form} />
      </form>
    </Modal>
  );
}

export default AddLinkModal;
