import { Button, ColorInput, Group, Stack, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { Hub } from "@prisma/client";

function HubFormFields({ form }: { form: UseFormReturnType<Hub> }) {
  return (
    <Stack spacing="md">
      <TextInput
        required
        label="Hub Name"
        placeholder="Hub Name"
        {...form.getInputProps("hubName")}
      />
      <TextInput
        label="Hub Logo"
        placeholder="Hub Logo"
        {...form.getInputProps("hubLogo")}
      />
      <TextInput
        label="Hub Path"
        placeholder="Hub Path"
        {...form.getInputProps("hubPath")}
      />
      <ColorInput
        placeholder="Pick color"
        label="Hub Primary Color"
        {...form.getInputProps("primaryColor")}
      />
      <ColorInput
        placeholder="Pick color"
        label="Hub Primary Color"
        {...form.getInputProps("secondaryColor")}
      />

      <Group position="center" mt="xl">
        <Button type="submit">Save</Button>
      </Group>
    </Stack>
  );
}

export default HubFormFields;
