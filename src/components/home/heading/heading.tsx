import { Stack, Title } from "@mantine/core";

import { Description } from "./description";

export function Heading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Stack align="center" mb="6em" gap="xl">
      <Title
        style={(theme) => ({
          [theme.fn.smallerThan("sm")]: {
            fontSize: 24,
          },
        })}
        size="4em"
        ta="center"
        mt="sm"
      >
        {title}
      </Title>
      <Description>{description}</Description>
    </Stack>
  );
}
