// src/pages/api/signup.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/app/database/db"; // upewnij się, że ścieżka jest poprawna
import User from "@/app/database/User";        // upewnij się, że ścieżka jest poprawna
import bcrypt from "bcryptjs";

interface Data {
  message?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Akceptujemy tylko metodę POST
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    // Połącz się z bazą danych
    await connectDB();

    // Pobierz dane z body
    const { email, password, username } = req.body;

    // Podstawowa walidacja
    if (!email || !password || !username) {
      return res.status(400).json({ error: "Brak wymaganych danych" });
    }

    // Sprawdź, czy użytkownik o podanym email już istnieje
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Użytkownik o tym emailu już istnieje" });
    }

    // Hashowanie hasła
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Utwórz nowego użytkownika
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    // Zapisz użytkownika w bazie
    await newUser.save();

    return res.status(201).json({ message: "Konto zostało utworzone pomyślnie" });
  } catch (error) {
    console.error("Błąd rejestracji:", error);
    return res.status(500).json({ error: "Błąd serwera" });
  }
}
