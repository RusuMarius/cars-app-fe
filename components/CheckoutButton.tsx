'use client';

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "./ui/button";

// Load Stripe (use the public key)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function CheckoutButton({ products }: { products: any[] }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    // Prepare the product data with promotion calculation
    const items = products.map((product: any) => {
      const basePrice = product.attributes.product.data?.attributes.price || product.attributes.shoe.data?.attributes.price;
      const promotion = product.attributes.product.data?.attributes.promotion || product.attributes.shoe.data?.attributes.promotion || 0;
      const shipping = 2

      // Apply promotion if exists
      const finalPrice = promotion > 0 ? basePrice - (basePrice * (promotion / 100)) : basePrice + shipping;

      return {
        name: product.attributes.product.data?.attributes.title || product.attributes.shoe.data?.attributes.title,
        price: Math.round(finalPrice * 100), // Price in cents
        quantity: product.quantity,
      };
    });

    // Call your Stripe checkout API endpoint
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }),
    });

    if (!res.ok) {
      console.error("Failed to create checkout session");
      return;
    }

    const { id } = await res.json();

    // Redirect to Stripe Checkout page
    const stripe = await stripePromise;
    if (stripe) {
      await stripe.redirectToCheckout({ sessionId: id });
    }

    setLoading(false);
  };

  return (
    <Button onClick={handleCheckout} disabled={loading} className="button-class">
      {loading ? "Processing..." : "Continue"}
    </Button>
  );
}
