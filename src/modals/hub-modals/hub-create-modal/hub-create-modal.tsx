import { usePost } from "@/lib/useQueries";
import { useForm } from "@mantine/form";

import { useHubOneStore } from "@/lib/Store";
import { Hub } from "@/lib/schema/app";
import { Button } from "@/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { HubFormFields } from "../hub-form-fields";

export function HubCreateModal({
  setOpened,
}: {
  setOpened: (open: boolean) => void;
}) {
  const hubSpaceId = useHubOneStore((state) => state.hubSpaceId);
  const form = useForm<Hub>({
    initialValues: {
      hubName: "",
      hubLogo: "",
      description:
        "Tired of keeping track of new websites? Tired of having to update your bookmarks every few weeks? Access all sites from this one page. Everything is up to date. No need to clutter your life anymore!",
      hubSpaceId,
    } as unknown as Hub,
  });

  const mutate = usePost<Hub>("hubs");
  const handleSubmit = (values: Hub) => {
    mutate(values);
    form.reset();
    setOpened(false);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create New Hub</DialogTitle>
      </DialogHeader>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <HubFormFields form={form} />
        <DialogFooter>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
