import { Button, Group, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { Hub } from "@prisma/client";

function HubFormFields({ form }: { form: UseFormReturnType<Partial<Hub>> }) {
  return (
    <>
      <TextInput
        required
        label="Hub Name"
        placeholder="Hub Name"
        {...form.getInputProps("hubName")}
      />
      <TextInput
        mt="md"
        label="Hub Logo"
        placeholder="Hub Logo"
        {...form.getInputProps("hubLogo")}
      />
      <TextInput
        mt="md"
        label="Hub Path"
        placeholder="Hub Path"
        {...form.getInputProps("hubPath")}
      />
      <Group position="center" mt="xl">
        <Button variant="outline" type="submit">
          Save
        </Button>
      </Group>
    </>
  );
}

export default HubFormFields;
