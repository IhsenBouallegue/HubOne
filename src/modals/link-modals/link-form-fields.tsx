"use client";

import { Link } from "@lib/schema";
import { Switch, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";

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
