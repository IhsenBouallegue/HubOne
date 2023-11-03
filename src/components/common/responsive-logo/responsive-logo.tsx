import Image from "next/image";
import Link from "next/link";

export function ResponsiveLogo() {
  return (
    <Link href="/">
      <Image
        alt="hubone logo"
        className="block md:hidden"
        src="/logo/hubone_logo.svg"
        height={28}
        width={28}
      />
      <Image
        alt="hubone logo"
        className="hidden md:block"
        src="/logo/hubone_logo_full.svg"
        height={28}
        width={128}
      />
    </Link>
  );
}
