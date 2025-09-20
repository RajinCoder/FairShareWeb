"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Visual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center mt-8 sm:mt-20"
    >
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-800 mb-6 sm:mb-8 text-center">
        FairShare
      </h1>
      <motion.div
        initial={{ scale: 0.8, rotate: -5 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative"
      >
        <Image
          src="/images/BrokenTable.png"
          alt="Broken Table"
          width={250}
          height={250}
          className="rounded-full border-4 border-black w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80"
        />
      </motion.div>
    </motion.div>
  );
}
