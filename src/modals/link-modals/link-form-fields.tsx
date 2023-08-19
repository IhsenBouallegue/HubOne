import type { UseFormReturnType } from "@mantine/form";
import type { Link } from "@prisma/client";
import { Switch, TextInput } from "@mantine/core";

export function LinkFormFields({ form }: { form: UseFormReturnType<Link> }) {
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
    </>
  );
}
