import Link from "next/link";

import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        href="/dashboard/hubspaces"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        HubSpaces
      </Link>
      <Link
        href="/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Organization
      </Link>
      <Link
        href="/plan"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Plan
      </Link>
      <Link
        href="/billing"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Billing
      </Link>
    </nav>
  );
}
