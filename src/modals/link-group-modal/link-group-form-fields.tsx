"use client";

import { LinkGroup } from "@lib/schema";
import { Button, Group, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";

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

      <Group justify="center" mt="xl">
        <Button variant="outline" type="submit">
          Save
        </Button>
      </Group>
    </>
  );
}
