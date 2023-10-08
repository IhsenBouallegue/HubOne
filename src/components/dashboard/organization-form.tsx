import { API_URL } from "@/lib/useQueries";
import { organizationSchema } from "@/lib/validations/organization";
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Icons } from "../icons";

export default function OrganizationForm({
  setShowNewOrganizationDialog,
}: { setShowNewOrganizationDialog: (shown: boolean) => void }) {
  const session = useSession();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof organizationSchema>>({
    resolver: zodResolver(organizationSchema),
    values: { admin: session.data?.user.id || "" } as z.infer<
      typeof organizationSchema
    >,
  });

  async function onSubmit(values: z.infer<typeof organizationSchema>) {
    setIsLoading(true);

    const res = await fetch(`${API_URL}/organizations`, {
      method: "POST",
      body: JSON.stringify(values),
    });

    setIsLoading(false);

    if (!res.ok) {
      return toast({
        title: "Something went wrong.",
        description:
          "Your organization creation request failed. Please try again.",
        variant: "destructive",
      });
    }

    return toast({
      title: "Organization created",
      description: "You can now create HubSpaces and Hubs.",
    });
  }
  return (
    <DialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                <FormDescription>This is your public name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="admin"
            render={() => (
              <FormItem>
                <FormLabel>Creator</FormLabel>
                <div
                  aria-label="Select an organization"
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
            )}
          />

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowNewOrganizationDialog(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Continue
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
