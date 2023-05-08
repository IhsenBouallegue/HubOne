import { Modal, Stack, Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { Hub } from "@prisma/client";
import { useEffect } from "react";

import { useUpdate } from "../../../../lib/useQueries";
import HubFormFields from "../HubFormFields";

import { useHubOneStore } from "../../../../lib/Store";
import FooterLinkAddCard from "./FooterLinkAddCard";
import FooterLinkCard from "./FooterLinkCard";

function EditHubModal({
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
      title="Edit Current Hub"
    >
      <Tabs defaultValue="Hub" variant="outline">
        <Tabs.List>
          <Tabs.Tab value="Hub">Hub</Tabs.Tab>
          <Tabs.Tab value="Footer Links">Footer Links</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="Hub" pt="xs">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <HubFormFields form={form} />
          </form>
        </Tabs.Panel>

        <Tabs.Panel value="Footer Links" pt="xs">
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

export default EditHubModal;
