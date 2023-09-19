import Script from "next/script";

export function StripePricingTable({
  pricingTableId,
  publishableKey,
  clientReferenceId,
}: {
  pricingTableId: string;
  publishableKey: string;
  clientReferenceId: string;
}) {
  if (!pricingTableId || !publishableKey) return null;
  return (
    <>
      <Script
        async
        strategy="lazyOnload"
        src="https://js.stripe.com/v3/pricing-table.js"
      />
      <stripe-pricing-table
        pricing-table-id={pricingTableId}
        publishable-key={publishableKey}
        client-reference-id={clientReferenceId}
      />
    </>
  );
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "stripe-pricing-table": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
