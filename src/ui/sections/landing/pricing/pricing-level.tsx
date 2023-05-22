import {
  Card,
  Title,
  useMantineTheme,
  Text,
  Stack,
  Group,
  Button,
  Box,
} from "@mantine/core";
import { IconArrowLeft, IconCheck } from "@tabler/icons-react";

export function PricingLevel({
  color,
  title,
  price,
  description,
  frequency,
  lastLevel = "",
  specialOffer = "",
  features,
  button,
  onClick,
}: {
  color: string;
  title: string;
  price: string;
  description: string;
  frequency: string;
  lastLevel?: string;
  specialOffer?: string;
  features: string[];
  button: string;
  onClick: () => void;
}) {
  const theme = useMantineTheme();

  return (
    <Card
      h="100%"
      w={320}
      shadow="lg"
      radius="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${theme.colors.gray[1]}`,
        gap: theme.spacing.xl,
        overflow: "visible",
      }}
      p="xl"
    >
      {specialOffer && (
        <Box
          sx={{
            width: "100%",
            my: "auto",
            position: "absolute",
            top: "-40px",
            left: "0",
            backgroundColor: color,
            height: "100px",
            zIndex: -1,
            paddingTop: "10px",
            borderRadius: theme.radius.lg,
          }}
        >
          <Title order={2} size="1em" align="center" color="white">
            {specialOffer}
          </Title>
        </Box>
      )}

      <Box>
        <Title order={2} size="1em" mb="1em" align="center" color={color}>
          {title}
        </Title>
        <Group position="center" spacing="xs">
          <Title order={2} size="3em" align="center">
            {price}
          </Title>
          <Title order={2} size="0.6em" align="center" color="dimmed">
            {frequency}
          </Title>
        </Group>
      </Box>

      <Text size={14} color="dimmed">
        {description}
      </Text>

      <Stack spacing="xs">
        {lastLevel && (
          <Group>
            <IconArrowLeft color={color} />
            <Text>Everything in {lastLevel}</Text>
          </Group>
        )}
        {features.map((feature) => (
          <Group key={feature}>
            <IconCheck color={color} />
            <Text>{feature}</Text>
          </Group>
        ))}
      </Stack>

      <Button
        mt="auto"
        styles={{
          root: {
            backgroundColor: color,
            border: 0,
            height: 42,
            paddingLeft: 20,
            paddingRight: 20,

            "&:hover": {
              backgroundColor: theme.fn.darken(color, 0.05),
            },
          },
        }}
        onClick={onClick}
        fullWidth
      >
        {button}
      </Button>
    </Card>
  );
}
