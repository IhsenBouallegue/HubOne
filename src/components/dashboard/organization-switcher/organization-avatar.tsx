import { Organization } from "@/lib/schema/orgaizations";
import { Avatar, AvatarImage } from "@/ui/avatar";

export function OrganizationAvatar({
  organization,
}: { organization: Organization }) {
  return (
    <Avatar className="mr-2 h-5 w-5">
      <AvatarImage
        src={`https://avatar.vercel.sh/${organization.slug}.png`}
        alt={organization.name}
      />
    </Avatar>
  );
}
