"use client";

import { LinkGroup } from "@/lib/schema/app";
import { usePost } from "@/lib/useQueries";
import { Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import { LinkGroupFormFields } from "./link-group-form-fields";

export function AddLinkGroupModal({
  opened,
  setOpened,
  hubId,
}: {
  opened: boolean;
  setOpened: (open: boolean) => void;
  hubId: number;
}) {
  const form = useForm<LinkGroup>({
    initialValues: {
      title: "",
      hubId,
    } as LinkGroup,
  });
  const mutate = usePost<LinkGroup>("linkgroups");
  const handleSubmit = (values: LinkGroup) => {
    mutate(values);
    form.reset();
    setOpened(false);
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Add a new link group"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <LinkGroupFormFields form={form} />
      </form>
    </Modal>
  );
}
