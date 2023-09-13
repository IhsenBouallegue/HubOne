import { Center, Image, Loader, Stack, Title } from "@mantine/core";

export default function HubLoading() {
  return (
    <Center h="100vh" w="inherit">
      <Stack align="center">
        <Loader size={64} color="primary.4" />
        <Title ta="center">Loading...</Title>
      </Stack>
    </Center>
  );
}
