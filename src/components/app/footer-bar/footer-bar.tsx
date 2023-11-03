import Image from "next/image";
import { FooterLinks } from "./footer-links";

export function FooterBar() {
  return (
    <div className="mt-[120px] flex border-t-2 flex-col border-slate-200 relative place-items-center px-6 py-8 sm:flex-row">
      <Image
        src="/logo/hubone_logo_full.svg"
        height={36}
        width={150}
        alt="hubone logo"
        className="static sm:absolute"
      />
      <div className="my-0 mx-auto relative sm:static">
        <FooterLinks />
      </div>
    </div>
  );
}
