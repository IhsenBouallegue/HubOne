import { Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { LinkGroup } from "@prisma/client";

import LinkGroupFormFields from "./LinkGroupFormFields";

function AddLinkGroupModal({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: (open: boolean) => void;
}) {
  const form = useForm<Partial<LinkGroup>>({
    initialValues: {
      title: "",
    },
  });
  type FormValues = typeof form.values;
  // eslint-disable-next-line no-console
  const handleSubmit = (values: FormValues) => console.log(values);

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Add a new link group"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <LinkGroupFormFields form={form} />
      </form>
    </Modal>
  );
}

export default AddLinkGroupModal;
