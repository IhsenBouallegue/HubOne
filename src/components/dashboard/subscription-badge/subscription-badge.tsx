import { useOrganization } from "@clerk/nextjs";
import { API_URL } from "@lib/useQueries";
import { Badge } from "@mantine/core";
import { useEffect, useState } from "react";

export function SubscriptionBadge() {
  const [product, setProduct] = useState<{ name: string }>();
  const { organization } = useOrganization();
  useEffect(() => {
    fetch(`${API_URL}/products`)

      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((json) => setProduct(json));
  }, [organization, organization?.id]);

  if (!product) return null;

  return (
    <Badge color="blue" variant="light">
      {product.name}
    </Badge>
  );
}
