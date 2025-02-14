"use client";

import React from "react";
import { Modal } from "./Modal"; // Twój modal
import { LoginFormDemo } from "./LoginFormDemo";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <LoginFormDemo onClose={onClose} />
    </Modal>
  );
};
