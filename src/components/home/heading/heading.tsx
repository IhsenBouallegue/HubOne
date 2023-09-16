import { Stack, Text, Title } from "@mantine/core";

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
      <Text>{description}</Text>
      {/* <Description>{description}</Description> */}
    </Stack>
  );
}
