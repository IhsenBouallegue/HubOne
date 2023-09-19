import { auth } from "@clerk/nextjs";
import { StripePricingTable } from "@sections/home/pricing/StripePricingTable";
import { getStripeCustomerId } from "app/api/products/route";

export default function Page() {
  const { sessionClaims } = auth();
  const clientReferenceId = getStripeCustomerId(sessionClaims);
  console.log(clientReferenceId);

  return (
    <StripePricingTable
      pricingTableId="prctbl_1NqbQyLZDDYfVnf19VrFuHwh"
      publishableKey={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""}
      clientReferenceId={clientReferenceId}
    />
  );
}
