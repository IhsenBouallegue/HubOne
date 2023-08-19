import { Box, Image, Stack, Text, Title } from "@mantine/core";

export function Mission() {
  return (
    <Box h="30vh">
      <Stack
        sx={(theme) => ({
          width: "100%",
          height: "inherit",
          backgroundColor: theme.colors.primary[4],
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `linear-gradient(250deg, ${theme.fn.rgba(
            theme.colors.secondary[4],
            0.4
          )} 0%, ${theme.fn.rgba(theme.colors.primary[4], 0.8)} 100%)`,
          position: "absolute",
        })}
      >
        <Stack my="auto" align="center">
          <Text color="white" size="xl">
            We help you
          </Text>
          <Title color="white" size="3em">
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
          width={150}
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
          width={150}
        />
      </Stack>
    </Box>
  );
}
