// src/app/layout.tsx
"use client";
import React from "react";
import { AuthProvider } from "./context/AuthContext";
import './globals.css';
import Navbar from "./components/Navbar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="pl">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
