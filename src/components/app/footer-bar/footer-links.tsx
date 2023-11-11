"use client";

import { useHubOneStore } from "@/lib/Store";
import { FooterLink } from "@/lib/schema/app";
import { useFetchByHubId } from "@/lib/useQueries";
import Link from "next/link";

export function FooterLinks() {
  const { data: footerLinks } = useFetchByHubId<FooterLink>(
    "footerlinks",
    useHubOneStore((state) => state.hubId)!
  );

  return (
    <div className="flex gap-4">
      {footerLinks?.map(({ title, url }) => (
        <Link
          className="text-muted leading-loose text-sm"
          key={`footer_link_${title}`}
          href={url}
        >
          {title}
        </Link>
      ))}
    </div>
  );
}
