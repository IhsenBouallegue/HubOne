import { Link } from "@/lib/schema/app";
import { usePost } from "@/lib/useQueries";
import { linksSchema } from "@/lib/validations/link";
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
import { LinkFormFields } from "../link-form-fields";

export function LinkCreateModal({
  setOpened,
  hubId,
  linkGroupId,
}: {
  setOpened: (open: boolean) => void;
} & Partial<Link>) {
  const form = useForm<z.infer<typeof linksSchema>>({
    resolver: zodResolver(linksSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      url: "",
      hubId,
      linkGroupId,
    },
  });
  const mutate = usePost<z.infer<typeof linksSchema>>("links");
  const onSubmit = (values: z.infer<typeof linksSchema>) => {
    mutate(values);
    form.reset();
    setOpened(false);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create New Link</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <LinkFormFields form={form} />
          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
