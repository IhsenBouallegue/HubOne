import { findOrCreateCustomerId } from "@/lib/findOrCreateCustomerId";
import { stripe } from "@/lib/stripe";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Stripe from "stripe";

interface CheckoutSubscriptionBody {
  priceId: string;
}

export async function POST(req: Request) {
  const body = (await req.json()) as CheckoutSubscriptionBody;
  const origin = req.headers.get("origin") || "http://localhost:3000";

  try {
    const { userId, orgId, user } = auth();
    if (!userId)
      return NextResponse.json(
        { message: "You must be logged in to subscribe" },
        { status: 500 }
      );
    const customerId = await findOrCreateCustomerId({
      clerkUserId: userId,
      clerkOrgId: orgId,
    });

    const session = await stripe.checkout.sessions.create({
      customer_email: user?.emailAddresses[0].emailAddress,
      billing_address_collection: "auto",
      customer: customerId,
      line_items: [
        {
          price: body.priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${origin}/dashboard`,
      cancel_url: `${origin}`,
    });
    if (session.url === null)
      return NextResponse.json({ message: "No session url" }, { status: 500 });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      const { message } = error;
      return NextResponse.json({ message }, { status: error.statusCode });
    }
    return NextResponse.json({ error }, { status: 500 });
  }
}
