import { LinkGroup } from "@/lib/schema/app";
import { usePost } from "@/lib/useQueries";
import { linkGroupsSchema } from "@/lib/validations/linkGroup";
import { Button } from "@/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Form } from "@/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LinkGroupFormFields } from "./link-group-form-fields";

export function AddLinkGroupModal({
  setOpened,
  hubId,
}: {
  setOpened: (open: boolean) => void;
  hubId: string;
}) {
  const form = useForm<z.infer<typeof linkGroupsSchema>>({
    resolver: zodResolver(linkGroupsSchema),
    defaultValues: { title: "", hubId },
  });
  const mutate = usePost<LinkGroup>("linkgroups");
  const onSubmit = (values: z.infer<typeof linkGroupsSchema>) => {
    mutate(values);
    form.reset();
    setOpened(false);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add a new link group</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <LinkGroupFormFields form={form} />
          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
