"use client";

import { useUser } from "@clerk/nextjs";
import { API_URL } from "@lib/useQueries";
import {
  Box,
  Button,
  Card,
  Group,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { loadStripe } from "@stripe/stripe-js";
import { IconArrowLeft, IconCheck } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Stripe from "stripe";

export function PricingLevel({
  color,
  title,
  price,
  priceId,
  description,
  frequency,
  lastLevel = "",
  specialOffer = "",
  currency,
  features,
  button,
}: {
  color: string;
  title: string;
  price: number;
  priceId: string;
  description: string;
  frequency: string;
  lastLevel?: string;
  currency: string;
  specialOffer?: string;
  features: string[];
  button: string;
}) {
  const theme = useMantineTheme();
  const { isSignedIn } = useUser();
  const searchParams = useSearchParams();
  const priceIdParam = searchParams.get("priceId");

  useEffect(() => {
    if (isSignedIn && priceIdParam && priceIdParam === priceId) {
      redirectToCheckout(priceId);
    }
  }, []);

  const redirectToCheckout = async (checkoutPriceId: string) => {
    const res = await fetch(`${API_URL}/create-checkout-session`, {
      method: "POST",
      body: JSON.stringify({ priceId: checkoutPriceId }),
    });
    const session: Stripe.Checkout.Session = await res.json();
    const clientStripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
    );
    await clientStripe?.redirectToCheckout({ sessionId: session.id });
  };

  const handleClick = async () => {
    if (!isSignedIn) {
      window.Clerk.mountSignUp(document.getElementById("sign-up"));
      window.Clerk.openSignUp({
        afterSignInUrl: `?priceId=${priceId}`,
      });
    } else {
      redirectToCheckout(priceId);
    }
  };

  return (
    <Card
      w={320}
      shadow="lg"
      radius="lg"
      p="xl"
      style={{
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${theme.colors.gray[1]}`,
        gap: theme.spacing.xl,
        overflow: "visible",
      }}
    >
      {specialOffer && (
        <Box
          style={{
            width: "100%",
            margin: "auto",
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
          <Title order={2} size="1em" ta="center" c="white">
            {specialOffer}
          </Title>
        </Box>
      )}

      <Box>
        <Title order={2} size="1em" mb="1em" ta="center" c={color}>
          {title}
        </Title>
        <Group align="center" gap="xs" justify="center">
          <Title order={2} size="3em">
            {price} {currency === "eur" ? "€" : ""}
          </Title>
          <Title order={2} size="0.6em" c="dimmed">
            {frequency}
          </Title>
        </Group>
      </Box>

      <Text size="sm" c="dimmed">
        {description}
      </Text>

      <Stack gap="xs">
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
          },
        }}
        fullWidth
        onClick={handleClick}
      >
        {isSignedIn ? button : "Sign Up"}
      </Button>
    </Card>
  );
}

declare global {
  interface Window {
    Clerk: {
      mountSignUp: (signIn: HTMLElement | null) => void;
      openSignUp: (options: { afterSignInUrl: string }) => void;
      load: () => Promise<void>;
      openOrganizationProfile: () => void;
    };
  }
}
