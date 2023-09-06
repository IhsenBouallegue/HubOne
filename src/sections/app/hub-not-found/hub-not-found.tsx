import { Center, Image, Stack, Text, Title } from "@mantine/core";

export function HubNotFound() {
  return (
    <Center
      style={{
        width: "inherit",
        height: "100vh",
      }}
    >
      <Stack
        style={{
          alignItems: "center",
        }}
      >
        <Image src="/logo/hubone_logo.svg" width={126} />
        <Title ta="center">Hub was not found.</Title>
        <Text ta="center">Please make sure you entered a valid Hub.</Text>
      </Stack>
    </Center>
  );
}
