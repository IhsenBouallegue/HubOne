import { Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { Hub } from "@prisma/client";

import HubFormFields from "./HubFormFields";

function EditHubModal({
  opened,
  setOpened,
  hubName,
  hubLogo,
  hubPath,
}: {
  opened: boolean;
  setOpened: (open: boolean) => void;
} & Partial<Hub>) {
  const form = useForm<Partial<Hub>>({
    initialValues: {
      hubName,
      hubLogo,
      hubPath,
    },
  });
  type FormValues = typeof form.values;
  // eslint-disable-next-line no-console
  const handleSubmit = (values: FormValues) => console.log(values);
  // const mutation = useMutation(
  //   (formData: Partial<Hub>) => {
  //     return postHub(formData);
  //   },
  //   {
  //     onSuccess: () => {
  //       // add delay to give the db time to save the values before refetching
  //       setTimeout(() => {
  //         queryClient.invalidateQueries(["hubs"]);
  //       }, 300);
  //     },
  //   }
  // );

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
