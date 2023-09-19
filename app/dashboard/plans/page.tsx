import { auth } from "@clerk/nextjs";
import { getStripeCustomerId } from "@lib/stripe";
import { StripePricingTable } from "@sections/home/pricing/StripePricingTable";

export default function Page() {
  const { sessionClaims } = auth();
  const clientReferenceId = getStripeCustomerId(sessionClaims);

  return (
    <StripePricingTable
      pricingTableId="prctbl_1NqbQyLZDDYfVnf19VrFuHwh"
      publishableKey={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""}
      clientReferenceId={clientReferenceId}
    />
  );
}
