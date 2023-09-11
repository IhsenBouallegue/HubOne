import { Image, rem } from "@mantine/core";

export function ResponsiveLogo() {
  return (
    <>
      <Image
        hiddenFrom="md"
        src="/logo/hubone_logo.svg"
        h={rem(28)}
        w={rem(28)}
      />
      <Image visibleFrom="md" src="/logo/hubone_logo_full.svg" w={rem(126)} />
    </>
  );
}
