import { organizationSchemaWithoutAdmin } from "@/lib/validations/organization";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Button } from "@/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import { toast } from "@/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SubmitButton from "../common/submit-button";
import { createOrganization } from "./organization-switcher/organization-switcher.actions";

export default function OrganizationForm({
  setShowNewOrganizationDialog,
}: { setShowNewOrganizationDialog: (shown: boolean) => void }) {
  const session = useSession();
  const form = useForm<z.infer<typeof organizationSchemaWithoutAdmin>>({
    resolver: zodResolver(organizationSchemaWithoutAdmin),
    defaultValues: { name: "", slug: "" },
  });
  const callAction = async (formData: FormData) => {
    await form.trigger();
    if (!form.formState.isValid) return;
    const { ok, error } = await createOrganization(formData);
    if (ok) {
      toast({
        title: "Organization created",
        description: "You can now create HubSpaces and Hubs.",
      });
      form.reset();
      setShowNewOrganizationDialog(false);
    }
    if (error || !ok) {
      toast({
        title: "Something went wrong.",
        description: error,
        variant: "destructive",
      });
    }
  };

  return (
    <DialogContent>
      <Form {...form}>
        <form action={callAction} className="space-y-8">
          <DialogHeader>
            <DialogTitle>Create organization</DialogTitle>
            <DialogDescription>
              Add a new organization to manage HubSpaces and Hubs.
            </DialogDescription>
          </DialogHeader>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormDescription>
                  This is the orgaization's public name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="slug" {...field} />
                </FormControl>
                <FormDescription>
                  This is the orgaization's public slug.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Creator</FormLabel>
            <div
              className={
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              }
            >
              <Avatar className="mr-2 h-5 w-5">
                <AvatarImage
                  src={session.data?.user.image || ""}
                  alt={session.data?.user.name || ""}
                />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              {session.data?.user.name || ""}
            </div>
            <FormDescription>
              You will be able to invite members and delete organization.
            </FormDescription>
            <FormMessage />
          </FormItem>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowNewOrganizationDialog(false)}
            >
              Cancel
            </Button>
            <SubmitButton />
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
