import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/ui/command";

export default function RoleCommand() {
  return (
    <Command>
      <CommandInput placeholder="Select new role..." />
      <CommandList>
        <CommandEmpty>No roles found.</CommandEmpty>
        <CommandGroup>
          <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
            <p>Viewer</p>
            <p className="text-sm text-muted-foreground">
              Can view and comment.
            </p>
          </CommandItem>
          <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
            <p>Developer</p>
            <p className="text-sm text-muted-foreground">
              Can view, comment and edit.
            </p>
          </CommandItem>
          <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
            <p>Billing</p>
            <p className="text-sm text-muted-foreground">
              Can view, comment and manage billing.
            </p>
          </CommandItem>
          <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
            <p>Owner</p>
            <p className="text-sm text-muted-foreground">
              Admin-level access to all resources.
            </p>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
