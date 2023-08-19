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
    <Stack align="center" mb="6em" spacing="xl">
      <Title
        sx={(theme) => ({
          [theme.fn.smallerThan("sm")]: {
            fontSize: 24,
          },
        })}
        size="4em"
        align="center"
        mt="sm"
      >
        {title}
      </Title>
      <Description>{description}</Description>
    </Stack>
  );
}
