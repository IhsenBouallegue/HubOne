import { Link } from "@lib/schema";
import { usePost } from "@lib/useQueries";
import { Button, Group, Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import { LinkFormFields } from "../link-form-fields";

export function LinkCreateModal({
  opened,
  setOpened,
  hubId,
  linkGroupId,
}: {
  opened: boolean;
  setOpened: (open: boolean) => void;
} & Partial<Link>) {
  const form = useForm<Link>({
    initialValues: {
      title: "",
      description: "",
      image: "",
      isInternal: false,
      link: "",
      hubId,
      linkGroupId,
    } as Link,
  });
  const mutate = usePost<Link>("links");
  const handleSubmit = (values: Link) => {
    mutate(values);
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
        <Group justify="center" mt="xl">
          <Button variant="filled" type="submit">
            Save
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
