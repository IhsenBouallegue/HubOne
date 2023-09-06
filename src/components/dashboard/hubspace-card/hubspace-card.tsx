import {
  Badge,
  Box,
  Center,
  Group,
  Paper,
  Stack,
  Text,
  rem,
} from "@mantine/core";

export default function HubSpaceCard() {
  return (
    <Paper
      w={rem(292)}
      h={rem(364)}
      shadow="md"
      radius="lg"
      style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}
    >
      <Center style={{ flex: 5 }} bg="blue">
        <Text c="white" fw="bold" size="xl">
          HubSpace1
        </Text>
      </Center>
      <Stack p="md" gap={0} style={{ flex: 6 }} justify="space-between">
        <Stack gap={0}>
          <Text>Name</Text>
          <Text size="sm">Updated about 1 hour ago</Text>
          <a href="hubspace1.huboneapp.com" style={{ fontSize: 14 }}>
            hubspace1.huboneapp.com
          </a>
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
