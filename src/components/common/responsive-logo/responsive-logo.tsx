import { Badge } from "@/ui/badge";
import Image from "next/image";
import Link from "next/link";

export function ResponsiveLogo() {
  return (
    <Link
      href={
        process.env.NODE_ENV === "production"
          ? "https://huboneapp.com"
          : "http://localtest.me:3000"
      }
      className="relative mb-2"
    >
      <Badge className="absolute right-1 -bottom-[14px] text-[9px] py-[1px] px-[10px] tracking-wider">
        BETA
      </Badge>
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
