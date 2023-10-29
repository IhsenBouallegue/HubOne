"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { useSelectedLayoutSegment } from "next/navigation";

const segments = [
  { label: "Overview", value: "dashboard" },
  { label: "Hubspaces", value: "dashboard/hubspaces" },
  { label: "Organization", value: "dashboard/organization" },
  { label: "Plan", value: "dashboard/plan" },
  { label: "Billing", value: "dashboard/billing" },
];

export function MainNav({
  className,
  selectedOrganization,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  selectedOrganization: string;
}) {
  const layoutSegment = useSelectedLayoutSegment();
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {segments.map((segment) => (
        <Link
          href={`/${selectedOrganization}/${segment.value}`}
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
