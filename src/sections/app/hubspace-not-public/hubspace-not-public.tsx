import { Center, Image, Stack, Text, Title } from "@mantine/core";

export function HubSpaceNotPublic() {
  return (
    <Center h="100vh" w="inherit">
      <Stack align="center">
        <Image src="/logo/hubone_logo.svg" w={126} />
        <Title ta="center">HubSpace is not public.</Title>
        <Text ta="center">
          You don&apos;t have access to this HubSpace. Please ask the admin for
          permission.
        </Text>
      </Stack>
    </Center>
  );
}
