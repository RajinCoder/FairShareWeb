"use client";

import React from "react";
import Visual from "@/components/Visual";
import NextScreenBtn from "@/components/NextScreenBtn";
import { useApp } from "@/context/AppContext";

export default function WelcomeScreen() {
  const { dispatch } = useApp();

  const handleNext = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between p-4 sm:p-6">
      <Visual />
      <div className="w-full max-w-md mb-8 sm:mb-20 px-4">
        <NextScreenBtn btnText="Create New Bill" onClick={handleNext} />
      </div>
    </div>
  );
}
