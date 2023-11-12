import { Icons } from "@/components/icons";
import { Button } from "@/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import RoleCommand from "./role-command";

export function RolePopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" disabled>
          Owner{" "}
          <Icons.chevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="end">
        <RoleCommand />
      </PopoverContent>
    </Popover>
  );
}
