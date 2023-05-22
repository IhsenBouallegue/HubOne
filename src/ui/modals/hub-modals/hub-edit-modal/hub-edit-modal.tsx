import type { Hub } from "@prisma/client";
import { useEffect } from "react";
import { Modal, Stack, Tabs, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useHubOneStore } from "@lib/Store";
import { useUpdate } from "@lib/useQueries";
import { HubFormFields } from "../hub-form-fields";
import { FooterLinkCard } from "./footer-link-card";
import { FooterLinkAddCard } from "./footer-link-add-card";

export function HubEditModal({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: (open: boolean) => void;
}) {
  const hub = useHubOneStore((state) => state.hub);
  const footerLinks = useHubOneStore((state) => state.footerLinks);

  const {
    id,
    hubName,
    hubLogo,
    hubPath,
    description,
    primaryColor,
    secondaryColor,
  } = hub;

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
    if (hubPath !== form.getInputProps("hubPath").value) form.setValues(hub);
  }, [form, hub, hubPath]);

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={<Title size="2rem">Edit Current Hub</Title>}
      size="lg"
    >
      <Tabs defaultValue="Hub" variant="pills">
        <Tabs.List mb="xl">
          <Tabs.Tab value="Hub">Hub</Tabs.Tab>
          <Tabs.Tab value="Footer Links">Footer Links</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="Hub">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <HubFormFields form={form} />
          </form>
        </Tabs.Panel>

        <Tabs.Panel value="Footer Links">
          <Stack>
            {footerLinks.map((footerLink) => (
              <FooterLinkCard
                key={`footerlink_edit_${footerLink.id}`}
                id={footerLink.id}
                title={footerLink.title}
                link={footerLink.link}
                hubId={footerLink.hubId}
              />
            ))}
            <FooterLinkAddCard hubId={id as number} />
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </Modal>
  );
}
