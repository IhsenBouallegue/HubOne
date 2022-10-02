import { Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { LinkGroup } from "@prisma/client";

import { postLinkGroup } from "../../../lib/requests/linkGroup/postLinkGroup";

import LinkGroupFormFields from "./LinkGroupFormFields";

function AddLinkGroupModal({
  opened,
  setOpened,
  hubId,
}: {
  opened: boolean;
  setOpened: (open: boolean) => void;
  hubId: number;
}) {
  const form = useForm<Partial<LinkGroup>>({
    initialValues: {
      title: "",
      hubId,
    },
  });
  type FormValues = typeof form.values;
  const handleSubmit = (values: FormValues) => {
    postLinkGroup(values);
    form.reset();
    setOpened(false);
  };

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
