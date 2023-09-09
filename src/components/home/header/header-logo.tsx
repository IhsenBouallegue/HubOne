import { Image } from "@mantine/core";

export function HeaderLogo() {
  return (
    <div>
      <Image hiddenFrom="sm" src="./logo/hubone_logo.svg" h={28} w={28} />
      <Image visibleFrom="sm" src="./logo/hubone_logo_full.svg" w={126} />
    </div>
  );
}
