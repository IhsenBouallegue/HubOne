import { auth } from "@clerk/nextjs";
import { findOrCreateCustomerId } from "@lib/findOrCreateCustomerId";
import { stripe } from "@lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// data needed for checkout
export interface CheckoutSubscriptionBody {
  price: string;
}

export async function POST(req: Request) {
  const body = (await req.json()) as CheckoutSubscriptionBody;
  const origin = req.headers.get("origin") || "http://localhost:3000";

  try {
    const { userId: clerkUserId } = auth();
    if (!clerkUserId)
      return NextResponse.json(
        { message: "You must be logged in to subscribe" },
        { status: 500 }
      );
    const customeId = await findOrCreateCustomerId({ clerkUserId });
    const session = await stripe.checkout.sessions.create({
      // if user is logged in, stripe will set the email in the checkout page
      billing_address_collection: "auto",
      customer: customeId,
      line_items: [
        {
          price: body.price,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${origin}/thankyou?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.json(session, { status: 200 });
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      console.log(error);

      const { message } = error;
      return NextResponse.json({ message }, { status: error.statusCode });
    }
  }
}
