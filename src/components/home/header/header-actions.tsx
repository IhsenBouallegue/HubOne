import { cn } from "@/lib/utils";
import { buttonVariants } from "@/ui/button";
import { Group } from "@mantine/core";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function HeaderActions() {
  const session = useSession();
  console.log(session);
  
  return (
    <Group>
      {session?.data ? (
        <Link
          href="/dashboard"
          className={cn(buttonVariants({ variant: "secondary" }))}
        >
          Dashboard
        </Link>
      ) : (
        <Link
          href="/sign-in"
          className={cn(buttonVariants({ variant: "default" }))}
        >
          Sign In
        </Link>
      )}
    </Group>
  );
}
