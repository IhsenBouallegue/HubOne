"use client";

import { cn } from "@/lib/utils";

import { Organization } from "@/lib/schema/orgaizations";
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
import Link from "next/link";
import { useState } from "react";
import { Icons } from "../../icons";
import OrganizationDialog from "../organization-dialog";
import { OrganizationAvatar } from "./organization-avatar";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

export function OrganizationSwitcher({
  className,
  selectedOrganization,
  memberOrganizations,
}: PopoverTriggerProps & {
  selectedOrganization: Organization | undefined;
  memberOrganizations: Organization[];
}) {
  const [open, setOpen] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  return (
    <Dialog open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            aria-label="Select an Organization"
            className={cn("w-[240px] justify-between shadow-md", className)}
          >
            {selectedOrganization && (
              <OrganizationAvatar organization={selectedOrganization} />
            )}
            {selectedOrganization?.name || "Nothing Selected"}
            <Icons.chevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px] p-1">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search organization..." />
              <CommandEmpty>No organization found.</CommandEmpty>
              <CommandGroup heading="Private">
                {memberOrganizations
                  .filter((org) => org.isPersonalOrganization)
                  .map((organization) => (
                    <OrganizationCommanndItem
                      key={organization.id}
                      organization={organization}
                      selectedOrganizationSlug={selectedOrganization?.slug}
                      setOpen={setOpen}
                    />
                  ))}
              </CommandGroup>
              <CommandGroup heading="Public">
                {memberOrganizations
                  .filter((org) => !org.isPersonalOrganization)
                  .map((organization) => (
                    <OrganizationCommanndItem
                      key={organization.id}
                      organization={organization}
                      selectedOrganizationSlug={selectedOrganization?.slug}
                      setOpen={setOpen}
                    />
                  ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setOpenCreateDialog(true);
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
      <OrganizationDialog setOpenCreateDialog={setOpenCreateDialog} />
    </Dialog>
  );
}

function OrganizationCommanndItem({
  organization,
  selectedOrganizationSlug,
  setOpen,
}: {
  organization: Organization;
  selectedOrganizationSlug: string | undefined;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Link href={`/${organization.slug}`}>
      <CommandItem
        onSelect={() => {
          setOpen(false);
        }}
        title={`${organization.name} (${organization.slug})`}
      >
        <OrganizationAvatar organization={organization} />
        <p className="text-sm truncate">
          {organization.name} ({organization.slug})
        </p>
        <Icons.checkIcon
          className={cn(
            "ml-auto h-4 w-4",
            selectedOrganizationSlug === organization.slug
              ? "opacity-100"
              : "opacity-0"
          )}
        />
      </CommandItem>
    </Link>
  );
}
