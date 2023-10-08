import { usePost } from "@/lib/useQueries";
import { Modal, Title } from "@mantine/core";
import { useForm } from "@mantine/form";

import { useHubOneStore } from "@/lib/Store";
import { Hub } from "@/lib/schema/app";
import { HubFormFields } from "../hub-form-fields";

export function HubCreateModal({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: (open: boolean) => void;
}) {
  const hubSpaceId = useHubOneStore((state) => state.hubSpaceId);
  const form = useForm<Hub>({
    initialValues: {
      hubName: "",
      hubLogo: "",
      description:
        "Tired of keeping track of new websites? Tired of having to update your bookmarks every few weeks? Access all sites from this one page. Everything is up to date. No need to clutter your life anymore!",
      hubSpaceId,
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
      title={<Title size="2rem">Create New Hub</Title>}
      size="lg"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <HubFormFields form={form} />
      </form>
    </Modal>
  );
}
