import { useHubOneStore } from "@/lib/Store";
import { FooterLink, Hub } from "@/lib/schema/app";
import { useFetchByHubId, useFetchItem, useUpdate } from "@/lib/useQueries";
import { insertHubsSchema } from "@/lib/validations/hubs";
import { Button } from "@/ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Form } from "@/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
    hubSpaceId,
  } = hub!;

  const { data: footerLinks } = useFetchByHubId<FooterLink>("footerlinks", id);

  const form = useForm<z.infer<typeof insertHubsSchema>>({
    resolver: zodResolver(insertHubsSchema),
    defaultValues: {
      id,
      hubName,
      hubLogo,
      hubPath,
      description,
      primaryColor,
      secondaryColor,
      hubSpaceId,
    },
  });
  const update = useUpdate<z.infer<typeof insertHubsSchema>>("hubs");
  const onSubmit = (values: z.infer<typeof insertHubsSchema>) => {
    update(values);
    setOpened(false);
  };

  useEffect(() => {
    if (hubPath !== form.getValues("hubPath")) form.reset(hub);
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <HubFormFields form={form} />
              <Button type="submit">Create</Button>
            </form>
          </Form>
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
