import { Box, Image, Stack, Text, Title } from "@mantine/core";

export function Mission() {
  return (
    <Box h="30vh">
      <Stack
        style={(theme) => ({
          width: "100%",
          height: "inherit",
          backgroundColor: theme.colors.primary[4],
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `linear-gradient(250deg, ${theme.colors.primary[4]} 0%, ${theme.colors.primary[6]} 100%)`,
          position: "absolute",
        })}
      >
        <Stack my="auto" align="center">
          <Text c="white" size="xl">
            We help you
          </Text>
          <Title c="white" size="3em">
            Work Smart not Hard.
          </Title>
        </Stack>
        <Image
          styles={{
            root: {
              position: "absolute",
              left: "10%",
              top: "5%",
            },
          }}
          src="dotted-2.png"
          w={150}
        />
        <Image
          styles={{
            root: {
              position: "absolute",
              right: "5%",
              bottom: "5%",
            },
          }}
          src="dotted-1.png"
          w={150}
        />
      </Stack>
    </Box>
  );
}
