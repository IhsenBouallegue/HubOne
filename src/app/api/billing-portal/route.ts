export async function POST() {
  1; // const origin = req.headers.get("origin") || "http://localhost:3000";
  // try {
  //   const { userId, orgId } = auth();
  //   if (!userId)
  //     return NextResponse.json(
  //       { message: "You must be logged in to manage billing" },
  //       { status: 500 }
  //     );
  //   const customerId = await findOrCreateCustomerId({
  //     clerkUserId: userId,
  //     clerkOrgId: orgId,
  //   });
  //   const { url } = await stripe.billingPortal.sessions.create({
  //     customer: customerId,
  //     return_url: `${origin}/dashboard`,
  //   });
  //   return NextResponse.json({ url }, { status: 200 });
  // } catch (e) {
  //   console.error(e, "Stripe Billing Portal redirect error");
  //   // Here, consider redirecting the user to an error page
  //   return NextResponse.error();
  // }
}
