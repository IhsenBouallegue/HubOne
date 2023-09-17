import { auth } from "@clerk/nextjs";
import { findOrCreateCustomerId } from "@lib/findOrCreateCustomerId";
import { stripe } from "@lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId: clerkUserId } = auth();
    if (!clerkUserId)
      return NextResponse.json(
        { message: "You must be logged in to subscribe" },
        { status: 500 }
      );
    const customerId = await findOrCreateCustomerId({ clerkUserId });
    const origin = req.headers.get("origin") || "http://localhost:3000";

    const { url } = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/dashboard`,
    });

    return NextResponse.json({ url }, { status: 200 });
  } catch (e) {
    console.error(e, "Stripe Billing Portal redirect error");

    // Here, consider redirecting the user to an error page
    return NextResponse.error();
  }
}
