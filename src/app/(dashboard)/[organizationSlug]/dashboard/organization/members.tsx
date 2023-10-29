import { Icons } from "@/components/icons";
import db from "@/lib/db";
import { organizations, usersToOrganizations } from "@/lib/schema/orgaizations";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { eq } from "drizzle-orm";
import RoleCommand from "./role-command";

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
          <div className="flex items-center justify-between space-x-4">
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
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                      Owner{" "}
                      <Icons.chevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="end">
                    <RoleCommand />
                  </PopoverContent>
                </Popover>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
