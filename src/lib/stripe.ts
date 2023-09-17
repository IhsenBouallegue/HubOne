import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
  maxNetworkRetries: 2,
});

interface Products {
  [productId: string]: {
    name: string;
    description: string | null;
    prices: Stripe.Price[];
  };
}

export const getProducts = async () => {
  const products = await stripe.products.list({ active: true });
  const prices = await stripe.prices.list({ active: true });

  // Create a map of products and their prices
  const productMap: Products = {};

  products.data.reverse().forEach((product) => {
    productMap[product.id] = {
      name: product.name,
      description: product.description,
      prices: prices.data.filter((price) => price.product === product.id),
    };
  });
  return productMap;
};
