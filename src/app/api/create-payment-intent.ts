// pages/api/create-payment-intent.ts
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

// Inicjalizacja Stripe przy użyciu klucza sekretnego
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-01-27.acacia",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  try {
    const { amount } = req.body;

    // Tworzymy PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd", // lub "pln" w zależności od Twoich ustawień
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Błąd przy tworzeniu PaymentIntent:", error);
    res.status(500).json({ error: "Błąd przy tworzeniu PaymentIntent" });
  }
}
