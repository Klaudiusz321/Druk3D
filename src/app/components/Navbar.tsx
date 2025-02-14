"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { IconUser } from "@tabler/icons-react";
import { useAuth } from "@/app/context/AuthContext";
import { SignupModal } from "./SignupModal";
import { LoginModal } from "./LoginModal";
import { useOutsideClick } from "@/app/hooks/use-outside-clik";

const Navbar = () => {
  const { isAuthenticated, setToken } = useAuth();

  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  const accountDropdownRef = useRef<HTMLDivElement>(null);

  // Używamy custom hooka, aby zamknąć dropdown konta, gdy klikniemy poza nim
  useOutsideClick(accountDropdownRef, () => setShowAccountDropdown(false));

  const openSignup = () => setIsSignupOpen(true);
  const openLogin = () => setIsLoginOpen(true);
  const closeSignup = () => setIsSignupOpen(false);
  const closeLogin = () => setIsLoginOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setShowAccountDropdown(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-4 py-4 bg-white dark:bg-black shadow-md z-50">
      <Link href="/">
        <span className="font-bold cursor-pointer">Logo</span>
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/store">
          <span className="cursor-pointer">Store</span>
        </Link>
        {!isAuthenticated ? (
          <>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md" onClick={openSignup}>
              Sign up
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-md" onClick={openLogin}>
              Log in
            </button>
          </>
        ) : (
          <>
            {/* Account Dropdown */}
            <div className="relative" ref={accountDropdownRef}>
              <button onClick={() => setShowAccountDropdown((prev) => !prev)}>
                <IconUser className="h-8 w-8 text-gray-800 dark:text-white cursor-pointer" />
              </button>
              {showAccountDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded shadow-lg z-50">
                  <Link
                    href="/orders"
                    className="block w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <SignupModal isOpen={isSignupOpen} onClose={closeSignup} />
      <LoginModal isOpen={isLoginOpen} onClose={closeLogin} />
    </nav>
  );
};

export default Navbar;
