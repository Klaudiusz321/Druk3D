// src/app/api/products/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/app/database/db";
import Product from "@/app/database/Product";

export async function GET(request: Request) {
  try {
    await connectDB();
    const products = await Product.find({});
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
