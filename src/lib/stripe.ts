import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
  maxNetworkRetries: 2,
});

export const getProducts = async () => {
  const [_products, prices] = await Promise.all([
    stripe.products.list(),
    stripe.prices.list(),
  ]);
  // const productPrices = {};
  // prices?.data.map((price) => (productPrices[price.product] = price));
  // products?.data.map((product) => (product.prices = productPrices[product.id]));
  return prices.data;
};
