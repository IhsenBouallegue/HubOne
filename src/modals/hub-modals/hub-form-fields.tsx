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
        name="name"
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
        name="slug"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Path</FormLabel>
            <div className="flex bg-zinc-200/30 font-mono rounded-md">
              <div className="w-3/5 items-center flex p-2 tracking-wide text-right justify-end">
                yourdomain.huboneapp.com/
              </div>
              <FormControl className="w-2/5">
                <Input placeholder="my-fav-hub" {...field} />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="logo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Logo</FormLabel>
            <FormControl>
              <Input placeholder="URL to an image" {...field} />
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
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
