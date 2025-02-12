// components/Navbar.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SignupModal } from "./SignupModal";


const Navbar = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const openSignup = () => setIsSignupOpen(true);
  const closeSignup = () => setIsSignupOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-4 py-4 bg-white dark:bg-black shadow-md z-50">
      <Link href="/">
        <span className="font-bold">Logo</span>
      </Link>
      <div className="flex items-center gap-4">
        
        <Link href="/store">Store</Link>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
          onClick={openSignup}
        >
          Sign up
        </button>
      </div>
      <SignupModal isOpen={isSignupOpen} onClose={closeSignup} />
    </nav>
  );
};

export default Navbar;
