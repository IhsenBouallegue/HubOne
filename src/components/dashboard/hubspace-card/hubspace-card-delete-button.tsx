"use client";

import { useDelete } from "@lib/useQueries";
import { Button } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

export default function HubSpaceCardDeleteButton({ id }: { id: number }) {
  const deleteItem = useDelete("hubspaces");
  return (
    <Button
      leftSection={<IconTrash />}
      variant="outline"
      color="secondary"
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        deleteItem(id);
      }}
    >
      Delete
    </Button>
  );
}
