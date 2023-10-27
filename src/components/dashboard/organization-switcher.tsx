"use client";

import { cn } from "@/lib/utils";

import { Organization } from "@/lib/schema/orgaizations";
import { API_URL } from "@/lib/useQueries";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Button } from "@/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/ui/command";
import { Dialog, DialogTrigger } from "@/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Icons } from "../icons";
import OrganizationForm from "./organization-form";

const groups = [
  {
    label: "Organizations",
    organizations: [],
  },
];

type OrganizationCommand = { label: string; value: string };

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

type OrganizationSwitcherProps = PopoverTriggerProps;

export function OrganizationSwitcher({ className }: OrganizationSwitcherProps) {
  const session = useSession();
  const [open, setOpen] = useState(false);
  const [memberOrganizations, setMemberOrganizations] = useState<
    OrganizationCommand[]
  >([]);
  const [showNewOrganizationDialog, setShowNewOrganizationDialog] =
    useState(false);
  const [selectedOrganization, setSelectedOrganization] =
    useState<OrganizationCommand>({ label: "", value: "" });

  useEffect(() => {
    if (!session.data?.user.id) return;
    fetch(
      `${API_URL}/usersOrganizations?${new URLSearchParams({
        userId: session.data?.user.id || "",
      })}`
    )
      .then((res) => res.json())
      .then(
        ({ memberOrganizations }: { memberOrganizations: Organization[] }) => {
          const memberOrganizationsCommand: OrganizationCommand[] =
            memberOrganizations.map((org) => ({
              label: org.name,
              value: org.id,
            }));
          setMemberOrganizations(memberOrganizationsCommand);
          if (selectedOrganization.value === "")
            setSelectedOrganization(memberOrganizationsCommand[0]);
        }
      );
  }, [session.data?.user.id]);
  return (
    <Dialog
      open={showNewOrganizationDialog}
      onOpenChange={setShowNewOrganizationDialog}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select an organization"
            className={cn("w-[200px] justify-between", className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                src={`https://avatar.vercel.sh/${selectedOrganization.value}.png`}
                alt={selectedOrganization.label}
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            {selectedOrganization.label}
            <Icons.sort className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search organization..." />
              <CommandEmpty>No organization found.</CommandEmpty>
              {groups.map((group) => (
                <CommandGroup key={group.label} heading={group.label}>
                  {memberOrganizations.map((organization) => (
                    <CommandItem
                      key={organization.value}
                      onSelect={() => {
                        setSelectedOrganization(organization);
                        setOpen(false);
                      }}
                      className="text-sm"
                    >
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage
                          src={`https://avatar.vercel.sh/${organization.value}.png`}
                          alt={organization.label}
                          className="grayscale"
                        />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      {organization.label}
                      <Icons.checkIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedOrganization.value === organization.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewOrganizationDialog(true);
                    }}
                  >
                    <Icons.plus className="mr-2 h-5 w-5" />
                    Create Organization
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <OrganizationForm
        setShowNewOrganizationDialog={setShowNewOrganizationDialog}
      />
    </Dialog>
  );
}
