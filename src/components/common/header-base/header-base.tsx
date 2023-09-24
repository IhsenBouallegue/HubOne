import { Paper } from "@mantine/core";

export function HeaderBase({ children }: { children: React.ReactNode }) {
  return (
    <Paper
      px="xl"
      py="md"
      m="sm"
      shadow="md"
      radius="lg"
      mih="4rem"
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {children}
    </Paper>
  );
}
