import db from "@/lib/db";
import { organizations, usersToOrganizations } from "@/lib/schema/orgaizations";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { eq } from "drizzle-orm";
import InviteMemberButton from "./invite-member-button";
import RemoveMemberButton from "./remove-member-buttons";
import { RolePopover } from "./role-popover";

export default async function Members({
  selectedOrganizationSlug,
}: { selectedOrganizationSlug: string }) {
  const selectedOrgaization = await db.query.organizations.findFirst({
    where: eq(organizations.slug, selectedOrganizationSlug),
  });
  if (!selectedOrgaization) return null;
  const organizationMembers = await db.query.usersToOrganizations
    .findMany({
      where: eq(usersToOrganizations.organizationId, selectedOrgaization.id),
      with: { user: true },
    })
    .then((res) => res.map((usersToOrganization) => usersToOrganization.user));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Members</CardTitle>
          <CardDescription>
            Invite your team members to collaborate.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex flex-col gap-6 items-center justify-between ">
            {organizationMembers.map((member) => (
              <div key={member.id} className="w-full flex">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={member.image ?? undefined} />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {member.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {member.email}
                    </p>
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-4">
                  <RolePopover />
                  <RemoveMemberButton
                    organizationId={selectedOrgaization.id}
                    userId={member.id}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="w-full flex mt-6">
            <InviteMemberButton organizationId={selectedOrgaization.id} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
