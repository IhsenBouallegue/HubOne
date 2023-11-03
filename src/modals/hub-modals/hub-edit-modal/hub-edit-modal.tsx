import { useHubOneStore } from "@/lib/Store";
import { FooterLink, Hub } from "@/lib/schema/app";
import { useFetchByHubId, useFetchItem, useUpdate } from "@/lib/useQueries";
import { Button } from "@/ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { HubFormFields } from "../hub-form-fields";
import { FooterLinkAddCard } from "./footer-link-add-card";
import { FooterLinkCard } from "./footer-link-card";

export function HubEditModal({
  setOpened,
}: {
  setOpened: (open: boolean) => void;
}) {
  const hubId = useHubOneStore((state) => state.hubId);
  const { data: hub } = useFetchItem<Hub>("hubs", hubId!);
  const {
    id,
    hubName,
    hubLogo,
    hubPath,
    description,
    primaryColor,
    secondaryColor,
  } = hub!;

  const { data: footerLinks } = useFetchByHubId<FooterLink>("footerlinks", id);

  const form = useForm<Hub>({
    initialValues: {
      id,
      hubName,
      hubLogo,
      hubPath,
      description,
      primaryColor,
      secondaryColor,
    } as Hub,
  });
  const update = useUpdate<Hub>("hubs");
  const handleSubmit = (values: Hub) => {
    update(values);
    setOpened(false);
  };
  useEffect(() => {
    if (hubPath !== form.getInputProps("hubPath").value) form.setValues(hub!);
  }, [form, hub, hubPath]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Current Hub </DialogTitle>
      </DialogHeader>
      <Tabs defaultValue="Hub">
        <TabsList className="mb-2 grid w-full grid-cols-2">
          <TabsTrigger value="Hub">Hub</TabsTrigger>
          <TabsTrigger value="Footer Links">Footer Links</TabsTrigger>
        </TabsList>

        <TabsContent value="Hub">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <HubFormFields form={form} />
            <Button type="submit">Create</Button>
          </form>
        </TabsContent>

        <TabsContent value="Footer Links">
          <div className="space-y-4">
            {footerLinks?.map((footerLink) => (
              <FooterLinkCard
                key={`footerlink_edit_${footerLink.id}`}
                id={footerLink.id}
                title={footerLink.title}
                link={footerLink.link}
                hubId={footerLink.hubId}
              />
            ))}
            <FooterLinkAddCard hubId={id} />
          </div>
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
}
