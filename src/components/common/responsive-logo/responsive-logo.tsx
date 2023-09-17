import { Image, rem } from "@mantine/core";
import Link from "next/link";

export function ResponsiveLogo() {
  return (
    <Link href="/">
      <Image
        hiddenFrom="md"
        src="/logo/hubone_logo.svg"
        h={rem(28)}
        w={rem(28)}
      />
      <Image visibleFrom="md" src="/logo/hubone_logo_full.svg" w={rem(126)} />
    </Link>
  );
}
