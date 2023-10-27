"use client";

import { cn } from "@/lib/utils";

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
import { useState } from "react";
import { Icons } from "../../icons";
import OrganizationForm from "../organization-form";

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

export function OrganizationSwitcher({
  className,
  memberOrganizations,
}: PopoverTriggerProps & { memberOrganizations: OrganizationCommand[] }) {
  const [open, setOpen] = useState(false);
  const [showNewOrganizationDialog, setShowNewOrganizationDialog] =
    useState(false);
  const [selectedOrganization, setSelectedOrganization] =
    useState<OrganizationCommand>(memberOrganizations[0]);

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
            {selectedOrganization && (
              <Avatar className="mr-2 h-5 w-5">
                <AvatarImage
                  src={`https://avatar.vercel.sh/${selectedOrganization.value}.png`}
                  alt={selectedOrganization.label}
                />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            )}
            {selectedOrganization?.label || "Nothing selected"}
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
