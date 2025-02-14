// src/app/api/profile/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/app/database/db"; // Dostosuj ścieżkę
import User from "@/app/database/User";         // Dostosuj ścieżkę
import Order from "@/app/database/Orders";       // Dostosuj ścieżkę
import jwt from "jsonwebtoken";

export async function GET(request: Request) {
  try {
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

    let decoded: any;
    try {
      decoded = jwt.verify(token, secret);
    } catch (err) {
      return NextResponse.json({ error: "Nieprawidłowy token" }, { status: 401 });
    }
    const userId = decoded.userId;

    await connectDB();

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json({ error: "Użytkownik nie znaleziony" }, { status: 404 });
    }

    const orders = await Order.find({ userId: user._id }).sort({ createdAt: -1 });
    return NextResponse.json({ user, orders }, { status: 200 });
  } catch (error) {
    console.error("Błąd pobierania profilu:", error);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
