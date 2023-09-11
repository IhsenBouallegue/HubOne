import { usePost } from "@lib/useQueries";
import { Modal, Title } from "@mantine/core";
import { useForm } from "@mantine/form";

import { auth, currentUser, useUser } from "@clerk/nextjs";
import { HubSpace } from "@lib/schema";
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
    } as HubSpace,
  });
  const { user } = useUser();
  const mutate = usePost<HubSpace>("hubspaces");
  const handleSubmit = (values: HubSpace) => {
    if (!user) return;
    mutate({ ...values, ownerId: user.id });
    console.log(values);

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
