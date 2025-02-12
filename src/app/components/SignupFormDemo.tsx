"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {cn} from "@/app/lib/utils";

export function SignupFormDemo() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    twitterpassword: "",
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
    // Przyjmujemy, że firstname i lastname łączą się w username
    const username = `${formData.firstname} ${formData.lastname}`;
    const { email, password } = formData;

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Konto zostało utworzone pomyślnie!");
      } else {
        setMessage(data.error || "Wystąpił błąd podczas rejestracji");
      }
    } catch (error) {
      setMessage("Błąd sieciowy. Spróbuj ponownie.");
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Rejestracja
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Wypełnij formularz, aby utworzyć nowe konto
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <div className="flex flex-col space-y-2 w-full">
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="Tyler" type="text" onChange={handleChange} />
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Durden" type="text" onChange={handleChange} />
          </div>
        </div>
        <div className="flex flex-col space-y-2 mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" onChange={handleChange} />
        </div>
        <div className="flex flex-col space-y-2 mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" onChange={handleChange} />
        </div>
        {/* Dodatkowe pole, np. twitterpassword, jeśli potrzebne */}
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-input"
          type="submit"
        >
          Sign up &rarr;
        </button>
      </form>
      {message && <p className="text-center text-sm text-red-500">{message}</p>}
    </div>
  );
}
