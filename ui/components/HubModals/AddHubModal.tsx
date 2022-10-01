import { Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { Hub } from "@prisma/client";

import HubFormFields from "./HubFormFields";

function EditHubModal({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: (open: boolean) => void;
}) {
  const form = useForm<Partial<Hub>>({
    initialValues: {
      hubName: "",
      hubLogo: "",
      hubPath: "",
    },
  });
  type FormValues = typeof form.values;
  // eslint-disable-next-line no-console
  const handleSubmit = (values: FormValues) => console.log(values);

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Create a new hub"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <HubFormFields form={form} />
      </form>
    </Modal>
  );
}

export default EditHubModal;
