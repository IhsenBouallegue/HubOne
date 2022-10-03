import { Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { Link } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (formData: Partial<Link>) => {
      return postLink(formData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["links"]);
      },
    }
  );
  const handleSubmit = (values: FormValues) => {
    try {
      mutation.mutate(values);
      form.reset();
      setOpened(false);
    } catch (error) {
      // TODO: error handling
    }
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
