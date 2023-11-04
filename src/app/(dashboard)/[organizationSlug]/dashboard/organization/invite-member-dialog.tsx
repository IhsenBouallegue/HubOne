import SubmitButton from "@/components/common/submit-button";
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
import { inviteMember } from "./member.actions";

const formSchema = z.object({
  email: z.string().email(),
});

export default function InviteMemberDialog({
  setOpen,
  organizationId,
}: {
  setOpen: (shown: boolean) => void;
  organizationId: string;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });
  const callAction = async (formData: FormData) => {
    await form.trigger();
    if (!form.formState.isValid) return;
    const inviteMemberToCurrentOrg = inviteMember.bind(null, organizationId);
    const { ok, error } = await inviteMemberToCurrentOrg(formData);
    if (ok) {
      toast({
        title: "Member added",
        description: "They can now access your organization.",
      });
      form.reset();
      setOpen(false);
    }
    if (error || !ok) {
      console.log(error);

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
            <DialogTitle>Invite Member</DialogTitle>
            <DialogDescription>
              Add a new member to your organization.
            </DialogDescription>
          </DialogHeader>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User E-Mail</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <SubmitButton text="Add" />
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
