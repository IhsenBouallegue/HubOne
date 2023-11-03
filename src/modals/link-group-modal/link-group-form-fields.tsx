"use client";

import { linkGroupsSchema } from "@/lib/validations/linkGroup";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export function LinkGroupFormFields({
  form,
}: {
  form: UseFormReturn<z.infer<typeof linkGroupsSchema>>;
}) {
  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem aria-required>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Documentation" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
