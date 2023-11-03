"use client";

import { Hub } from "@/lib/schema/app";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import type { UseFormReturnType } from "@mantine/form";

export function HubFormFields({ form }: { form: UseFormReturnType<Hub> }) {
  return (
    <div className="flex flex-col gap-4">
      <Input
        required
        placeholder="Hub Name"
        {...form.getInputProps("hubName")}
      />
      <Input
        required
        placeholder="Hub Path"
        {...form.getInputProps("hubPath")}
      />
      <Input placeholder="Hub Logo" {...form.getInputProps("hubLogo")} />
      <Textarea
        placeholder="Hub Description"
        {...form.getInputProps("description")}
      />
      {/* <ColorInput
        placeholder="Pick color"
        label="Hub Primary Color"
        {...form.getInputProps("primaryColor")}
      />
      <ColorInput
        placeholder="Pick color"
        label="Hub Secondary Color"
        {...form.getInputProps("secondaryColor")}
      /> */}
    </div>
  );
}
