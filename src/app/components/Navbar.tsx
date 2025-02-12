"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Parametry animacji
const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

// Komponent MenuItem – pojawia się rozwijane podmenu przy najechaniu
export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-black hover:opacity-90 dark:text-white"
      >
        {item}
      </motion.p>
      {active !== null && active === item && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
            <motion.div
              transition={transition}
              layoutId="active" // zapewnia płynną animację przejścia
              className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/20 dark:border-white/20 shadow-xl"
            >
              <motion.div layout className="w-max h-full p-4">
                {children}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Komponent Menu – kontener dla elementów menu, resetuje aktywny item po opuszczeniu obszaru
export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-transparent dark:bg-black dark:border-white/20 bg-white shadow-input flex justify-center space-x-4 px-8 py-6"
    >
      {children}
    </nav>
  );
};

const Navbar = () => {
  const [active, setActive] = useState<string | null>(null);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Górna belka – wersja desktopowa */}
      <div className="flex justify-between items-center px-8 py-4 bg-white dark:bg-black shadow-md">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Link href="/">
            Logo
          </Link>
          {/* Menu desktop */}
          <div className="hidden md:block">
            <Menu setActive={setActive}>
              
              <MenuItem setActive={setActive} active={active} item="Store">
                <Link href="/store">Store</Link>
              </MenuItem>
              
            </Menu>
          </div>
        </div>
        {/* Przycisk mobilnego menu */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="focus:outline-none">
            {isMenuOpen ? (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      {/* Rozwijane menu mobilne */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white dark:bg-black shadow-md p-4"
        >
          <ul className="flex flex-col space-y-4">
            <li>
              <Link href="/" onClick={toggleMobileMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/store" onClick={toggleMobileMenu}>
                Store
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={toggleMobileMenu}>
                About
              </Link>
            </li>
          </ul>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
