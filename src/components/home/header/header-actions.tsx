import { SignedIn, UserButton, SignedOut, SignInButton } from "@clerk/nextjs";
import { Group, Button } from "@mantine/core";

export function HeaderActions() {
  return (
    <Group>
      <SignedIn>
        <Button
          variant="light"
          style={{ height: 30 }}
          component="a"
          href="/dashboard"
        >
          Dashboard
        </Button>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal" redirectUrl="/dashboard">
          <Button variant="gradient" style={{ height: 30 }}>
            Sign In
          </Button>
        </SignInButton>
      </SignedOut>
    </Group>
  );
}
