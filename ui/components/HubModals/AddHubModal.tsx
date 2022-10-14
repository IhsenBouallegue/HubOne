import { Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { Hub } from "@prisma/client";

import { usePost } from "../../../lib/useQueries";

import HubFormFields from "./HubFormFields";

function EditHubModal({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: (open: boolean) => void;
}) {
  const form = useForm<Hub>({
    initialValues: {
      hubName: "",
      hubLogo: "",
      hubPath: "",
    } as Hub,
  });

  const mutate = usePost<Hub>("hubs");
  const handleSubmit = (values: Hub) => {
    mutate(values);
    form.reset();
    setOpened(false);
  };

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
