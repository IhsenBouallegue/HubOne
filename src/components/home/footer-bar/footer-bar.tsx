import { Image } from "@mantine/core";
import { FooterLinks } from "./footer-links";

export function FooterBar() {
  return (
    <div className="mt-[120px] flex border-t-2 flex-col border-slate-200 relative place-items-center px-6 py-8 sm:flex-row">
      <Image
        src="/logo/hubone_logo_full.svg"
        fit="contain"
        h={36}
        w={150}
        className="static sm:absolute"
      />
      <div className="my-0 mx-auto relative sm:static">
        <FooterLinks />
      </div>
    </div>
  );
}
