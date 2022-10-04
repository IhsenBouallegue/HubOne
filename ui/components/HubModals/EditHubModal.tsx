import { Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { Hub } from "@prisma/client";

import { useUpdate } from "../../../lib/useQueries";

import HubFormFields from "./HubFormFields";

function EditHubModal({
  opened,
  setOpened,
  id,
  hubName,
  hubLogo,
  hubPath,
}: {
  opened: boolean;
  setOpened: (open: boolean) => void;
} & Partial<Hub>) {
  const form = useForm<Partial<Hub>>({
    initialValues: {
      id,
      hubName,
      hubLogo,
      hubPath,
    },
  });
  type FormValues = typeof form.values;
  const update = useUpdate<Hub>("hubs");
  const handleSubmit = (values: FormValues) => {
    update({ newItem: values as Hub, itemID: id as number });
    setOpened(false);
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Edit current hub"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <HubFormFields form={form} />
      </form>
    </Modal>
  );
}

export default EditHubModal;
