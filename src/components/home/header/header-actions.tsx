import { Button, Group } from "@mantine/core";
import { useSession } from "next-auth/react";

export function HeaderActions() {
  const session = useSession();
  if (session.data) {
    return (
      <>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </>
    );
  }
  return (
    <Group>
      <Button
        variant="light"
        style={{ height: 30 }}
        component="a"
        href="/dashboard"
      >
        Dashboard
      </Button>
      <Button variant="gradient" style={{ height: 30 }}>
        Sign In
      </Button>
    </Group>
  );
}
