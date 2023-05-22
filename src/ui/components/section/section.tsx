import { Container } from "@mantine/core";

export function Section({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode[];
}) {
  return (
    <Container
      id={id}
      size="lg"
      mt="16em"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {children}
    </Container>
  );
}
