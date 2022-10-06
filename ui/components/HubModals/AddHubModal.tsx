import { Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { Hub } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postHub } from "../../../lib/requests/hub/postHub";

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

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (formData: Partial<Hub>) => {
      return postHub(formData);
    },
    {
      onSuccess: () => {
        // add delay to give the db time to save the values before refetching
        setTimeout(() => {
          queryClient.invalidateQueries(["hubs"]);
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
      title="Create a new hub"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <HubFormFields form={form} />
      </form>
    </Modal>
  );
}

export default EditHubModal;
