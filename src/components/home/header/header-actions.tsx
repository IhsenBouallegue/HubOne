import { SignIn, SignOut } from "@components/common/auth";
import { Button, Group } from "@mantine/core";
import { useSession } from "next-auth/react";

export function HeaderActions() {
  const session = useSession();
  if (session.data) {
    return (
      <>
        <pre>{JSON.stringify(session, null, 2)}</pre>
        <SignOut>Sign out</SignOut>
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
      <SignIn provider="google">Sign in with Google</SignIn>
    </Group>
  );
}
