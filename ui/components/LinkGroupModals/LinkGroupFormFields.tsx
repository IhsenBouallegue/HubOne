import { Button, Group, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { LinkGroup } from "@prisma/client";

function LinkGroupFormFields({
  form,
}: {
  form: UseFormReturnType<Partial<LinkGroup>>;
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
          Submit
        </Button>
      </Group>
    </>
  );
}

export default LinkGroupFormFields;
