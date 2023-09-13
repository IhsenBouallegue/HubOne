import { Center, Image, Stack, Text, Title } from "@mantine/core";

export function HubNotFound() {
  return (
    <Center h="100vh" w="inherit">
      <Stack align="center">
        <Image src="/logo/hubone_logo.svg" w={126} />
        <Title ta="center">Hub was not found.</Title>
        <Text ta="center">Please make sure you entered a valid Hub.</Text>
      </Stack>
    </Center>
  );
}
