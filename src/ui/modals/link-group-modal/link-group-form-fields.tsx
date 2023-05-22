import type { UseFormReturnType } from "@mantine/form";
import type { LinkGroup } from "@prisma/client";
import { Button, Group, TextInput } from "@mantine/core";

export function LinkGroupFormFields({
  form,
}: {
  form: UseFormReturnType<LinkGroup>;
}) {
  return (
    <>
      <TextInput
        required
        label="Title"
        placeholder="Title"
        {...form.getInputProps("title")}
      />

      <Group position="center" mt="xl">
        <Button variant="outline" type="submit">
          Save
        </Button>
      </Group>
    </>
  );
}
