"use client";

import { HubSpace } from "@lib/schema";
import {
  Button,
  ColorInput,
  Group,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
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

      <Group align="center" mt="xl">
        <Button type="submit">Save</Button>
      </Group>
    </Stack>
  );
}
