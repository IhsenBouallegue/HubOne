import { HubSpace } from "@lib/schema";
import { Badge, Box, Center, Group, Paper, Stack, Text } from "@mantine/core";
import Link from "next/link";

export default function HubSpaceCard({ domain, createdAt }: HubSpace) {
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
        <Stack gap={0}>
          <Text>{domain}</Text>
          <Text size="sm">Created on {createdAt?.toDateString()}</Text>
          <Link
            href={`https://${domain}.huboneapp.com`}
            style={{ fontSize: 14 }}
          >
            {domain}.huboneapp.com
          </Link>
        </Stack>
        <Group gap={6}>
          <Box h="10px" w="10px" bg="green" style={{ borderRadius: "100%" }} />
          <Text size="sm" c="green">
            is active
          </Text>
        </Group>
        <Stack>
          <Badge w="5em" mt="auto">
            Free
          </Badge>
        </Stack>
      </Stack>
    </Paper>
  );
}
