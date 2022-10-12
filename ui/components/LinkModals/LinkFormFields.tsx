import { Button, Group, Switch, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { Link } from "@prisma/client";
import { Trash } from "tabler-icons-react";

function LinkFormFields({
  form,
  deleteItem,
}: {
  form: UseFormReturnType<Partial<Link>>;
  deleteItem: () => void;
}) {
  return (
    <>
      <TextInput
        required
        label="Title"
        placeholder="Title"
        {...form.getInputProps("title")}
      />
      <TextInput
        required
        mt="md"
        label="Description"
        placeholder="Description"
        {...form.getInputProps("description")}
      />
      <TextInput
        mt="md"
        label="Image"
        placeholder="Image"
        {...form.getInputProps("image")}
      />
      <TextInput
        mt="md"
        label="Link"
        placeholder="Link"
        {...form.getInputProps("link")}
      />
      <Switch mt="md" label="Internal" {...form.getInputProps("isInternal")} />

      <Group position="center" mt="xl">
        <Button
          leftIcon={<Trash />}
          variant="outline"
          type="submit"
          color="secondary"
          onClick={deleteItem}
        >
          Delete
        </Button>
        <Button variant="filled" type="submit">
          Save
        </Button>
      </Group>
    </>
  );
}

export default LinkFormFields;
