"use client";

import { Icons } from "@/components/icons";
import { useDashboardStore } from "@/lib/Store/dashboard";
import { User } from "@/lib/schema/auth";
import { UsersToOrganization } from "@/lib/schema/orgaizations";
import { API_URL } from "@/lib/useQueries";
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
import { useEffect, useState } from "react";
import RoleCommand from "./role-command";

export default function Members() {
  const selectedOrganizationId = useDashboardStore(
    (state) => state.selectedOrganizationId
  );
  const [members, setMembers] = useState<User[]>([]);

  useEffect(() => {
    fetch(
      `${API_URL}/organization-members/?organizationId=${selectedOrganizationId}`
    )
      .then((res) => res.json())
      .then(
        ({
          organizationMembers,
        }: { organizationMembers: (UsersToOrganization & { user: User })[] }) =>
          setMembers(organizationMembers?.map((member) => member.user) ?? [])
      );
  }, [selectedOrganizationId]);

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
            {members.map((member) => (
              <>
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
              </>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
