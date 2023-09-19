import { auth } from "@clerk/nextjs";
import { JwtPayload } from "@clerk/types";
import { stripe } from "@lib/stripe";
import { NextResponse } from "next/server";

export async function GET() {
  const { sessionClaims } = auth();
  const stripeCustomerId = getStripeCustomerId(sessionClaims);
  const subscription = await stripe.subscriptions.list({
    customer: stripeCustomerId,
    status: "active",
  });
  const subscribedProductId = subscription.data[0]?.items?.data[0].plan.product;
  if (!subscribedProductId || subscribedProductId === null)
    return NextResponse.json({ message: "No product found" }, { status: 500 });

  const product = await stripe.products.retrieve(subscribedProductId as string);
  console.log(product);

  return NextResponse.json(product);
}

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
