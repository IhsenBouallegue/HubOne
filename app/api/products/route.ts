import { auth } from "@clerk/nextjs";
import { getStripeCustomerId, stripe } from "@lib/stripe";
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

  return NextResponse.json(product);
}
