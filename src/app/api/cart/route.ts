// src/app/api/cart/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/app/database/db";
import Cart from "@/app/database/Cart"; // model koszyka – omówimy go później
import jwt from "jsonwebtoken";

export async function GET(request: Request) {
  try {
    // Pobieramy token z nagłówka
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Brak tokena autoryzacyjnego" }, { status: 401 });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Brak tokena autoryzacyjnego" }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json({ error: "Brak konfiguracji JWT_SECRET" }, { status: 500 });
    }
    const decoded: any = jwt.verify(token, secret);
    const userId = decoded.userId;

    await connectDB();
    
    // Pobieramy koszyk użytkownika (zakładamy, że mamy model Cart, który posiada pole userId i items)
    const cart = await Cart.findOne({ userId });
    return NextResponse.json({ cartItems: cart?.items || [] }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
