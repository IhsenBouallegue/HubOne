"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { useSelectedLayoutSegment } from "next/navigation";

const segments = [
  { label: "Overview", value: null },
  { label: "Hubspaces", value: "hubspaces" },
  { label: "Organization", value: "organization" },
  { label: "Plan", value: "plan" },
  { label: "Billing", value: "billing" },
];

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const layoutSegment = useSelectedLayoutSegment();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {segments.map((segment) => (
        <Link
          href={`/dashboard/${segment.value ?? ""}`}
          key={segment.value}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            layoutSegment !== segment.value && "text-muted-foreground"
          )}
        >
          {segment.label}
        </Link>
      ))}
    </nav>
  );
}
