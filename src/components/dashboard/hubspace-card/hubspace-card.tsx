"use client";

import { HubSpace } from "@/lib/schema/app";
import { Badge, Box, Center, Group, Paper, Stack, Text } from "@mantine/core";
import Link from "next/link";
import HubSpaceCardDeleteButton from "./hubspace-card-delete-button";

export default function HubSpaceCard({
  id,
  domain,
  createdAt,
  isPublic,
}: HubSpace) {
  return (
    <Paper
      w={292}
      h={364}
      shadow="md"
      radius="lg"
      style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}
    >
      <Center style={{ flex: 5 }} bg="blue">
        <Text c="white" fw="bold" size="xl">
          {domain}
        </Text>
      </Center>
      <Stack p="md" gap={0} style={{ flex: 6 }} justify="space-between">
        <Stack>
          <Stack gap={2}>
            <Text size="sm">Created on {createdAt?.toDateString()}</Text>
            <Link
              href={`https://${domain}.huboneapp.com`}
              style={{ fontSize: 14 }}
            >
              {domain}.huboneapp.com
            </Link>
          </Stack>
          <Group>{isPublic && <Badge>Public</Badge>}</Group>
        </Stack>
        <Group gap={6}>
          <Box h="10px" w="10px" bg="green" style={{ borderRadius: "100%" }} />
          <Text size="sm" c="green">
            is active
          </Text>
        </Group>
        <HubSpaceCardDeleteButton id={id} />
      </Stack>
    </Paper>
  );
}
