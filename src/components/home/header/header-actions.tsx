import { Button } from "@/components/ui/button";
import { Group } from "@mantine/core";
import { useSession } from "next-auth/react";
import Link from "next/link";

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
      <Button>Dashboard</Button>
      <Link href="/sign-in">
        <Button>Sign In</Button>
      </Link>
    </Group>
  );
}
