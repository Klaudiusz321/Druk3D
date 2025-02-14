// src/app/components/GoogleLoginButton.tsx
"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { IconBrandGoogle } from "@tabler/icons-react"; // lub inna biblioteka ikon, którą używasz
import BottomGradient from "./BottomGradient";

const GoogleLoginButton = () => {
  const handleGoogleSignIn = () => {
    // "google" to identyfikator providera, który skonfigurowałeś w NextAuth
    signIn("google");
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
    >
      <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
      <span className="text-neutral-700 dark:text-neutral-300 text-sm">Google</span>
      <BottomGradient />
    </button>
  );
};

export default GoogleLoginButton;
