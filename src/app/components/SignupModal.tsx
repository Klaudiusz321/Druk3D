// components/SignupModal.tsx
"use client";

import React from "react";
import { Modal } from "./Modal";
import { SignupFormDemo } from "./SignupFormDemo";// upewnij się, że ścieżka jest poprawna

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignupModal = ({ isOpen, onClose }: SignupModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <SignupFormDemo />
    </Modal>
  );
};
