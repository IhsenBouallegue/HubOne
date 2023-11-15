import { Icons } from "@/components/icons";
import { Link } from "@/lib/schema/app";
import { useDelete, useUpdate } from "@/lib/useQueries";
import { insertLinksSchema } from "@/lib/validations/link";
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

export function LinkEditModal({
  setOpened,
  ...link
}: {
  opened: boolean;
  setOpened: (open: boolean) => void;
} & Omit<Link, "createdAt">) {
  const form = useForm<z.infer<typeof insertLinksSchema>>({
    resolver: zodResolver(insertLinksSchema),
    defaultValues: {
      ...link,
    },
  });
  const update = useUpdate<z.infer<typeof insertLinksSchema>>("links");
  const deleteItem = useDelete("links");
  const onSubmit = (values: z.infer<typeof insertLinksSchema>) => {
    update(values);
    setOpened(false);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Link</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <LinkFormFields form={form} />
          <DialogFooter className="space-x-4">
            <Button
              variant="destructive"
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                e.preventDefault();
                deleteItem(link.id);
                setOpened(false);
              }}
              className="flex gap-2"
            >
              <Icons.trash />
              Delete
            </Button>
            <Button autoFocus type="submit">
              Edit
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
