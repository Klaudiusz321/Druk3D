// src/app/api/login/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/app/database/db";  // dostosuj ścieżkę
import User from "@/app/database/User";          // dostosuj ścieżkę
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Brak wymaganych danych" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Nieprawidłowe dane logowania" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Nieprawidłowe dane logowania" },
        { status: 401 }
      );
    }

    // Załóżmy, że masz zmienną środowiskową JWT_SECRET w pliku .env
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    return NextResponse.json(
      { message: "Zalogowano pomyślnie", token },
      { status: 200 }
    );
  } catch (error) {
    console.error("Błąd logowania:", error);
    return NextResponse.json(
      { error: "Błąd serwera" },
      { status: 500 }
    );
  }
}
