import HubLogo from "@/components/app/hub-logo";
import ResponsiveLogo from "@/components/common/responsive-logo";
import { Icons } from "@/components/icons";

export function HeaderLogo() {
  return (
    <div className="flex flex-nowrap items-center gap-2">
      <ResponsiveLogo />
      <Icons.close size={20} strokeWidth={2} />
      <div className="h-10 w-10">
        <div className="h-10 w-10 absolute rounded-md overflow-hidden">
          <HubLogo />
        </div>
      </div>
    </div>
  );
}
