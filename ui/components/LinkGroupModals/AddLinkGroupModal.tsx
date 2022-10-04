import { Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { LinkGroup } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (formData: Partial<LinkGroup>) => {
      return postLinkGroup(formData);
    },
    {
      onSuccess: () => {
        // add delay to give the db time to save the values before refetching
        setTimeout(() => {
          queryClient.invalidateQueries(["linkgroups"]);
        }, 300);
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
      title="Add a new link group"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <LinkGroupFormFields form={form} />
      </form>
    </Modal>
  );
}

export default AddLinkGroupModal;
