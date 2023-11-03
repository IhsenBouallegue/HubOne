"use client";

import { hubsSchema, insertHubsSchema } from "@/lib/validations/hubs";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export function HubFormFields({
  form,
}: {
  form: UseFormReturn<z.infer<typeof hubsSchema | typeof insertHubsSchema>>;
}) {
  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={form.control}
        name="hubName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="My Favourite Hub" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="hubPath"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Path</FormLabel>
            <FormControl>
              <Input placeholder="my-fav-hub" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="hubLogo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Logo</FormLabel>
            <FormControl>
              <Input placeholder="My Favourite Hub" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Textarea placeholder="My Favourite Hub" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
