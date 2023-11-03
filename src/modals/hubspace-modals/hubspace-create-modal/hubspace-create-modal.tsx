import SubmitButton from "@/components/common/submit-button";
import { OrganizationAvatar } from "@/components/dashboard/organization-switcher/organization-avatar";
import { Organization } from "@/lib/schema/orgaizations";
import { hubSpaceSchema } from "@/lib/validations/hubSpaces";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createHubSpace } from "./hubspace.actions";

export function HubSpaceCreateModal({
  setShowDialog,
  organization,
}: { setShowDialog: (shown: boolean) => void; organization: Organization }) {
  const form = useForm<z.infer<typeof hubSpaceSchema>>({
    resolver: zodResolver(hubSpaceSchema),
    defaultValues: { name: "", domain: "", ownerId: "" },
  });

  const callAction = async (formData: FormData) => {
    await form.trigger();
    if (!form.formState.isValid) return;

    const { ok, error } = await createHubSpace(formData);
    if (ok) {
      toast({
        title: "HubSpace created",
        description: "You can now create Hubs and Links.",
      });
      form.reset();
      setShowDialog(false);
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
            <DialogTitle>Create HubSpace</DialogTitle>
            <DialogDescription>
              Add a new HubSpace to manage Hubs and Links.
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
                  This is the HubSpaces's public name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="domain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Domain</FormLabel>
                <FormControl>
                  <Input placeholder="domain" {...field} />
                </FormControl>
                <FormDescription>
                  This is the HubSpace's public slug.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Input
            type="hidden"
            {...form.register("ownerId")}
            value={organization.id}
          />
          <FormItem>
            <FormLabel>Creator</FormLabel>
            <div
              className={
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              }
            >
              <OrganizationAvatar organization={organization} />
              {organization.name}
            </div>
            <FormDescription>
              This organization will own the HubSpace.
            </FormDescription>
            <FormMessage />
          </FormItem>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <SubmitButton />
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
