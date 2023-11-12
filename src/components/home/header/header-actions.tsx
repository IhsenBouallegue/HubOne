import { UserSelect } from "@/components/common/user-select/user-select";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/ui/button";
import Link from "next/link";
import { auth } from "../../../../auth";

export async function HeaderActions() {
  const session = await auth();
  return (
    <div className="flex justify-center gap-4 items-center">
      {session?.user ? (
        <>
          <Link
            href="/dashboard"
            className={cn(buttonVariants({ variant: "secondary" }))}
          >
            Dashboard
          </Link>
          <UserSelect />
        </>
      ) : (
        <div className="space-x-4">
          <Link
            href="/sign-up"
            className={cn(buttonVariants({ variant: "light" }))}
          >
            Sign up
          </Link>
          <Link
            href="/sign-in"
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
}
