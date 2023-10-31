import { cn } from "@/lib/utils";
import { buttonVariants } from "@/ui/button";
import { Card, CardContent } from "@/ui/card";
import { IconArrowLeft, IconCheck } from "@tabler/icons-react";
import Link from "next/link";

export function PricingLevel({
  color,
  title,
  price,
  description,
  frequency,
  lastLevel = "",
  specialOffer = "",
  currency,
  features,
  button,
}: {
  color: string;
  title: string;
  price: number;
  priceId: string;
  description: string;
  frequency: string;
  lastLevel?: string;
  currency: string;
  specialOffer?: string;
  features: string[];
  button: string;
}) {
  return (
    <Card className="w-72 min-h-full shadow-lg flex flex-col relative">
      {specialOffer && (
        <div
          className="w-full h-[50px] pt-2 m-auto absolute -top-[40px] left-0 -z-10 rounded-t-lg"
          style={{
            backgroundColor: color,
          }}
        >
          <h2 className="text-center font-bold text-white">{specialOffer}</h2>
        </div>
      )}
      <CardContent>
        <div className="flex flex-col place-items-center mb-6">
          <h2 className="text-lg mb-4 font-bold" style={{ color }}>
            {title}
          </h2>
          <div className="flex gap-2">
            <h2 className="text-3xl font-bold">
              {price} {currency === "eur" ? "€" : ""}
            </h2>
            <h2 className="text-sm text-muted">{frequency}</h2>
          </div>
        </div>

        <p className="text-sm text-muted">{description}</p>

        <div className="flex flex-col gap-4 my-6">
          {lastLevel && (
            <div>
              <IconArrowLeft color={color} />
              <p>Everything in {lastLevel}</p>
            </div>
          )}
          {features.map((feature) => (
            <div className="flex gap-2" key={feature}>
              <IconCheck color={color} />
              <p>{feature}</p>
            </div>
          ))}
        </div>

        <Link
          href="/dashboard/plans"
          className={cn(
            buttonVariants({ variant: "secondary" }),
            "mt-auto px-2 h-[42px] w-full text-white"
          )}
          style={{
            backgroundColor: color,
          }}
        >
          {button}
        </Link>
      </CardContent>
    </Card>
  );
}
