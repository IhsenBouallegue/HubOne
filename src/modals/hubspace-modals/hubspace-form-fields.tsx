"use client";

import { HubSpace } from "@/lib/schema/app";
import { Button, Checkbox, Group, Stack, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";

export function HubSpaceFormFields({
  form,
}: { form: UseFormReturnType<HubSpace> }) {
  return (
    <Stack gap="md">
      <TextInput
        required
        label="Domain"
        placeholder="Domain"
        data-autofocus
        {...form.getInputProps("domain")}
      />
      <Checkbox
        label="This is a public HubSpace"
        data-autofocus
        {...form.getInputProps("isPublic")}
      />
      <Group align="center" mt="xl">
        <Button type="submit">Save</Button>
      </Group>
    </Stack>
  );
}
