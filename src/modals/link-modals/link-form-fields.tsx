"use client";

import { insertLinksSchema, linksSchema } from "@/lib/validations/link";
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

export function LinkFormFields({
  form,
}: {
  form: UseFormReturn<z.infer<typeof linksSchema | typeof insertLinksSchema>>;
}) {
  return (
    <div className="space-y-8">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem aria-required>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Wikipedia" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem aria-required>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input placeholder="Wikipedia for all" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem aria-required>
            <FormLabel>Image</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="url"
        render={({ field }) => (
          <FormItem aria-required>
            <FormLabel>Link</FormLabel>
            <FormControl>
              <Input placeholder="www.wikipedia.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
