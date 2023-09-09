import { Stack, Title } from "@mantine/core";

import { Description } from "./description";

import classes from "./heading.module.css";

export function Heading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Stack align="center" mb="6em" gap="xl">
      <Title className={classes.heading} size="4em" ta="center" mt="sm">
        {title}
      </Title>
      <Description>{description}</Description>
    </Stack>
  );
}
