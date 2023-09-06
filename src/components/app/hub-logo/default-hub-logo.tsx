import { Box, Title, getGradient } from "@mantine/core";

export function DefaultHubLogo({
  hubName = "X",
  primaryColor = "#ff008c",
  secondaryColor = "#0cd4f7",
}: {
  hubName: string;
  primaryColor: string;
  secondaryColor: string;
}) {
  return (
    <Box
      style={(theme) => ({
        minWidth: "32px",
        width: "100%",
        padding: "6px",
        borderRadius: theme.radius.md,
        backgroundImage: getGradient(
          { deg: 135, from: primaryColor, to: secondaryColor },
          theme
        ),
        color: theme.white,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        webkitUserSelect: "none",
        mozUserSelect: "none",
        msUserSelect: "none",
        userSelect: "none",
        aspectRatio: "1/1",
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
