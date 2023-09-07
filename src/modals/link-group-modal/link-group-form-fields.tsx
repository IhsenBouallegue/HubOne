"use client";

import type { UseFormReturnType } from "@mantine/form";
import { Button, Group, TextInput } from "@mantine/core";
import { LinkGroup } from "@lib/schema";

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
