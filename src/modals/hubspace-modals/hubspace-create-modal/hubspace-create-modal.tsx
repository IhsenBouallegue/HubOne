import { usePost } from "@/lib/useQueries";
import { Modal, Title } from "@mantine/core";
import { useForm } from "@mantine/form";

import { HubSpace } from "@/lib/schema";
import { HubSpaceFormFields } from "../hubspace-form-fields";

export function HubSpaceCreateModal({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: (open: boolean) => void;
}) {
  const form = useForm<HubSpace>({
    initialValues: {
      domain: "",
      isPublic: false,
    } as HubSpace,
  });
  const mutate = usePost<HubSpace>("hubspaces");
  const handleSubmit = (values: HubSpace) => {
    mutate(values);
    form.reset();
    setOpened(false);
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={<Title size="2rem">Create New HubSpace</Title>}
      size="lg"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <HubSpaceFormFields form={form} />
      </form>
    </Modal>
  );
}
