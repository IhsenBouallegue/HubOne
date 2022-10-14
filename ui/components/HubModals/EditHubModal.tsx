import { Modal, Stack, Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { FooterLink, Hub } from "@prisma/client";

import { useUpdate } from "../../../lib/useQueries";

import FooterLinkAddCard from "./FooterLinkAddCard";
import FooterLinkCard from "./FooterLinkCard";
import HubFormFields from "./HubFormFields";

function EditHubModal({
  opened,
  setOpened,
  footerLinks,
  id,
  hubName,
  hubLogo,
  hubPath,
}: {
  opened: boolean;
  setOpened: (open: boolean) => void;
  footerLinks: FooterLink[];
} & Hub) {
  const form = useForm<Hub>({
    initialValues: {
      id,
      hubName,
      hubLogo,
      hubPath,
    } as Hub,
  });
  const update = useUpdate<Hub>("hubs");
  const handleSubmit = (values: Hub) => {
    update(values);
    setOpened(false);
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Edit Current Hub"
    >
      <Tabs defaultValue="Hub" variant="pills">
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
                {...footerLink}
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
