"use client";

import React from "react";
import { motion } from "framer-motion";

interface NextScreenBtnProps {
  btnText: string;
  onClick: () => void;
  disabled?: boolean;
}

export default function NextScreenBtn({
  btnText,
  onClick,
  disabled = false,
}: NextScreenBtnProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className="w-full max-w-md h-16 bg-blue-800 text-white rounded-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-900 transition-colors"
    >
      {btnText}
    </motion.button>
  );
}
