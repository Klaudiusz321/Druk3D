// components/CheckoutButton.tsx
import React from "react";
import StripeCheckout, { Token } from "react-stripe-checkout";

interface CheckoutButtonProps {
  amount: number;
  shippingCost: number;
}

export const CheckoutButton: React.FC<CheckoutButtonProps> = ({ amount, shippingCost }) => {
  const totalAmount = (amount + shippingCost) * 100;

  const onToken = async (token: Token) => {
    console.log("Token z Stripe:", token);
    // Logika wysyłki tokena do backendu
  };

  return (
    <StripeCheckout
      stripeKey={process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!}
      token={onToken}
      amount={totalAmount}
      name="Nazwa Twojego produktu"
      description={`Łączna kwota: ${(amount + shippingCost).toFixed(2)} PLN`}
      currency="PLN"
      billingAddress
      shippingAddress
    />
  );
};
