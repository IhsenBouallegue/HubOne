import { Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { Link } from "@prisma/client";

import { postLink } from "../../../lib/requests/link/postLink";

import LinkFormFields from "./LinkFormFields";

function AddLinkModal({
  opened,
  setOpened,
  hubId,
  linkGroupId,
}: {
  opened: boolean;
  setOpened: (open: boolean) => void;
} & Partial<Link>) {
  const form = useForm<Partial<Link>>({
    initialValues: {
      title: "",
      description: "",
      image: "",
      isInternal: false,
      link: "",
      hubId,
      linkGroupId,
    },
  });
  type FormValues = typeof form.values;
  const handleSubmit = (values: FormValues) => {
    postLink(values);
    form.reset();
    setOpened(false);
  };

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
