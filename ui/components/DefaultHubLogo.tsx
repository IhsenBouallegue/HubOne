import { Box, Title } from "@mantine/core";
import type { Hub } from "@prisma/client";

export default function DefaultHubLogo({
  hubName,
  primaryColor,
  secondaryColor,
}: Hub) {
  return (
    <Box
      sx={(theme) => ({
        height: "32px",
        minWidth: "32px",
        padding: "6px",
        borderRadius: theme.radius.md,
        backgroundImage: theme.fn.gradient({
          from: primaryColor,
          to: secondaryColor,
          deg: 135,
        }),
        color: theme.white,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      })}
    >
      <Title size={16}>{shorten(hubName)}</Title>
    </Box>
  );
}

const shorten = (name: string) => {
  // name has only lower case
  if (name === name.toLowerCase()) return name[0].toUpperCase();
  // get upper case letters
  return name?.replace(/[^A-Z]+/g, "");
};
