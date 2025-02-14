"use client";

import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation"; // dla App Router
import { useAuth } from "@/app/context/AuthContext";

interface LoginFormDemoProps {
  onClose: () => void; // prop, który zamknie modal
}

export function LoginFormDemo({ onClose }: LoginFormDemoProps) {
  const router = useRouter();
  const { setToken } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        // Zamykamy modal logowania
        onClose();
        // Opcjonalnie: odśwież stronę, jeśli potrzebujesz
        router.refresh();
      } else {
        setMessage(data.error || "Błąd logowania");
      }
    } catch (error) {
      setMessage("Błąd sieciowy. Spróbuj ponownie.");
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">Log in</h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Wpisz dane, aby się zalogować
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-2 mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="twoj.email@example.com"
            type="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col space-y-2 mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            onChange={handleChange}
            autoComplete="current-password"
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-br from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-input"
        >
          Log in &rarr;
        </button>
      </form>
      {message && <p className="text-center text-sm text-red-500">{message}</p>}
    </div>
  );
}
