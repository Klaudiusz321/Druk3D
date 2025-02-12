// src/app/api/signup/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/app/database/db"; // dostosuj ścieżkę
import User from "@/app/database/User";         // dostosuj ścieżkę
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password, username } = body;

  if (!email || !password || !username) {
    return NextResponse.json(
      { error: "Brak wymaganych danych" },
      { status: 400 }
    );
  }

  await connectDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { error: "Użytkownik o tym emailu już istnieje" },
      { status: 400 }
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    createdAt: new Date(),
  });

  await newUser.save();

  return NextResponse.json(
    { message: "Konto zostało utworzone pomyślnie" },
    { status: 201 }
  );
}
