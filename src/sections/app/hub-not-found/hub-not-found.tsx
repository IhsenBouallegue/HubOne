import { Center, Image, Stack, Text, Title } from "@mantine/core";

export function HubNotFound() {
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
        <Title align="center">Hub was not found.</Title>
        <Text align="center">Please make sure you entered a valid Hub.</Text>
      </Stack>
    </Center>
  );
}
