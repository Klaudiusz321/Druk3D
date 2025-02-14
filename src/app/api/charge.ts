// pages/api/charge.ts
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

// Inicjalizacja Stripe z użyciem klucza prywatnego
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-01-27.acacia",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  try {
    const { token, amount } = req.body;
    // Tworzymy charge na podstawie tokena
    const charge = await stripe.charges.create({
      amount,
      currency: "pln",
      source: token.id,
      description: "Zakup produktu w sklepie",
    });

    return res.status(200).json({ success: true, charge });
  } catch (error) {
    console.error("Stripe charge error:", error);
    return res.status(500).json({ error: "Błąd przy pobieraniu płatności" });
  }
}
