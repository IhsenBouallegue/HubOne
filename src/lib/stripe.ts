import { JwtPayload } from "@clerk/types";
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
  maxNetworkRetries: 2,
});

interface Products {
  [productId: string]: {
    name: string;
    description: string | null;
    color: string | undefined;
    prices: Stripe.Price[];
  };
}

export const getProducts = async () => {
  const products = await stripe.products.list({ active: true });
  const prices = await stripe.prices.list({ active: true });

  // Create a map of products and their prices
  const productMap: Products = {};

  for (const product of products.data) {
    productMap[product.id] = {
      name: product.name,
      description: product.description,
      color: product.metadata.color,
      prices: prices.data.filter((price) => price.product === product.id),
    };
  }
  return productMap;
};

export function getStripeCustomerId(sessionClaims: JwtPayload | null) {
  let stripeCustomerId = "";
  const { stripeCustomerId: orgStripeCustomerId } =
    sessionClaims?.orgPublicMetadata as {
      stripeCustomerId: string | undefined;
    };

  const { stripeCustomerId: userStripeCustomerId } =
    sessionClaims?.userPublicMetadata as {
      stripeCustomerId: string | undefined;
    };
  if (orgStripeCustomerId) {
    stripeCustomerId = orgStripeCustomerId;
  } else if (userStripeCustomerId) {
    stripeCustomerId = userStripeCustomerId;
  }
  return stripeCustomerId;
}
