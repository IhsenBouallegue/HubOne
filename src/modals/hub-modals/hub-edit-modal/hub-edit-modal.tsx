"use client";

import { useHubOneStore } from "@/lib/Store";
import { FooterLink, Hub } from "@/lib/schema";
import { useFetchByHubId, useFetchItem, useUpdate } from "@/lib/useQueries";
import { Modal, Stack, Tabs, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { HubFormFields } from "../hub-form-fields";
import { FooterLinkAddCard } from "./footer-link-add-card";
import { FooterLinkCard } from "./footer-link-card";

export function HubEditModal({
  opened,
  setOpened,
}: {
  opened: boolean;
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
            {footerLinks?.map((footerLink) => (
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
