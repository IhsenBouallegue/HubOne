"use client";

import { Hub } from "@/lib/schema";
import {
  Button,
  ColorInput,
  Group,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";

export function HubFormFields({ form }: { form: UseFormReturnType<Hub> }) {
  return (
    <Stack gap="md">
      <TextInput
        required
        label="Hub Name"
        placeholder="Hub Name"
        {...form.getInputProps("hubName")}
      />
      <TextInput
        required
        label="Hub Path"
        placeholder="Hub Path"
        {...form.getInputProps("hubPath")}
      />
      <TextInput
        label="Hub Logo"
        placeholder="Hub Logo"
        {...form.getInputProps("hubLogo")}
      />
      <Textarea
        placeholder="Hub Description"
        label="Hub Description"
        autosize
        {...form.getInputProps("description")}
      />
      <ColorInput
        placeholder="Pick color"
        label="Hub Primary Color"
        {...form.getInputProps("primaryColor")}
      />
      <ColorInput
        placeholder="Pick color"
        label="Hub Secondary Color"
        {...form.getInputProps("secondaryColor")}
      />

      <Group align="center" mt="xl">
        <Button type="submit">Save</Button>
      </Group>
    </Stack>
  );
}
