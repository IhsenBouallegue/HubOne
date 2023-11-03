import { usePost } from "@/lib/useQueries";

import { useHubOneStore } from "@/lib/Store";
import { hubsSchema } from "@/lib/validations/hubs";
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
import { HubFormFields } from "../hub-form-fields";

export function HubCreateModal({
  setOpened,
}: {
  setOpened: (open: boolean) => void;
}) {
  const hubSpaceId = useHubOneStore((state) => state.hubSpaceId);
  const form = useForm<z.infer<typeof hubsSchema>>({
    resolver: zodResolver(hubsSchema),
    defaultValues: {
      hubName: "",
      hubPath: "",
      hubLogo: "",
      description: "",
      secondaryColor: undefined,
      primaryColor: undefined,
      hubSpaceId,
    },
  });

  const mutate = usePost<z.infer<typeof hubsSchema>>("hubs");
  const onSubmit = (values: z.infer<typeof hubsSchema>) => {
    mutate(values);
    form.reset();
    setOpened(false);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create New Hub</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <HubFormFields form={form} />
          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
