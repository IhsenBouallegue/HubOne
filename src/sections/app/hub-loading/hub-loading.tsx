import { Center, Image, Loader, Stack, Title } from "@mantine/core";

export default function HubLoading() {
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
        <Title ta="center">Loading...</Title>
        <Loader size={64} variant="dots" color="primary.4" />
      </Stack>
    </Center>
  );
}
