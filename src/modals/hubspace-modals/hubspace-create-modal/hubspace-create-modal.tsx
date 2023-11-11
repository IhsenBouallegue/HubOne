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
import { Switch } from "@/ui/switch";
import { toast } from "@/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createHubSpace } from "./hubspace.actions";
const formSchema = hubSpaceSchema.extend({ hubName: z.string() });
export function HubSpaceCreateModal({
  setShowDialog,
  organization,
}: { setShowDialog: (shown: boolean) => void; organization: Organization }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      domain: "",
      ownerId: "",
      isPublic: true,
      hubName: "Home",
    },
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
                {field.value !== "" && (
                  <FormDescription>
                    Your HubSpace will be available under {field.value}
                    .huboneapp.com.
                  </FormDescription>
                )}
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
              <OrganizationAvatar organization={organization} />
              {organization.name}
            </div>
            <FormDescription>
              This organization will own the HubSpace.
            </FormDescription>
            <FormMessage />
          </FormItem>

          <FormField
            control={form.control}
            name="isPublic"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg">
                <div className="space-y-0.5">
                  <FormLabel>Public</FormLabel>
                  <FormDescription>
                    People without an account can view this HubSpace.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    {...form.register("isPublic")}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Input
            type="hidden"
            {...form.register("ownerId")}
            value={organization.id}
          />

          <FormField
            control={form.control}
            name="hubName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Default Hub Name</FormLabel>
                <FormControl>
                  <Input placeholder="Hub Name" {...field} />
                </FormControl>
                <FormDescription>
                  This can also be changed later.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
