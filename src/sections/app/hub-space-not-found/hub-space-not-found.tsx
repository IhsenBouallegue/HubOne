import { Center, Image, Stack, Text, Title } from "@mantine/core";

export function HubSpaceNotFound() {
  return (
    <Center
      sx={{
        width: "inherit",
        height: "100vh",
      }}
    >
      <Stack
        sx={{
          alignItems: "center",
        }}
      >
        <Image src="/logo/hubone_logo.svg" width={126} />
        <Title align="center">Hub Space was not found.</Title>
        <Text align="center">
          Please make sure you entered a valid Hub Space.
        </Text>
      </Stack>
    </Center>
  );
}
