'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';

// Load Stripe (use the public key)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const PaymentForm = ({ products }: { products: any[] }) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    const items = products.map((product: any) => ({
      name: product.title,
      price: Math.round(product.price * 100), // Price in cents
      quantity: product.quantity,
    }));

    // Call your Stripe checkout API endpoint
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }),
    });

    if (!res.ok) {
      console.error('Failed to create checkout session');
      setLoading(false);
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
      {loading ? 'Processing...' : 'Proceed to Payment'}
    </Button>
  );
};

export default PaymentForm;
