import { AppShell, Header, Navbar } from "@mantine/core";

export default function index() {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height="100%" p="xs">
          Content
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          Header
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colors.gray[0],
        },
      })}
    >
      App
    </AppShell>
  );
}
