"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Person } from "@/types";
import NextScreenBtn from "@/components/NextScreenBtn";

export default function FormScreen() {
  const { dispatch } = useApp();
  const [numberOfPeople, setNumberOfPeople] = useState<number>(0);
  const [peopleNames, setPeopleNames] = useState<string[]>([]);

  useEffect(() => {
    if (numberOfPeople > 0) {
      const defaultNames = Array(numberOfPeople)
        .fill("")
        .map((_, index) => `Person ${index + 1}`);
      setPeopleNames(defaultNames);
    }
  }, [numberOfPeople]);

  const handleNameChange = (index: number, value: string) => {
    const updatedNames = [...peopleNames];
    updatedNames[index] = value;
    setPeopleNames(updatedNames);
  };

  const handleNext = () => {
    const people: Person[] = peopleNames.map((name, index) => ({
      id: `person-${index}`,
      name: name || `Person ${index + 1}`,
    }));

    dispatch({ type: "SET_PEOPLE", payload: people });
    dispatch({ type: "NEXT_STEP" });
  };

  const isFormValid =
    numberOfPeople > 0 && peopleNames.every((name) => name.trim() !== "");

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg mt-8 sm:mt-20"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-900">
          How many people?
        </h2>

        <div className="mb-8">
          <select
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
            className="w-full p-4 border-2 border-gray-400 rounded-lg text-lg text-gray-900 bg-white focus:border-blue-600 focus:outline-none"
          >
            <option value={0}>Select a number</option>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {numberOfPeople > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">
              Enter names:
            </h3>
            {peopleNames.map((name, index) => (
              <input
                key={index}
                type="text"
                value={name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                placeholder={`Person ${index + 1}`}
                className="w-full p-4 border-2 border-gray-400 rounded-lg text-lg text-gray-900 bg-white focus:border-blue-600 focus:outline-none"
              />
            ))}
          </motion.div>
        )}
      </motion.div>

      <div className="w-full max-w-md mb-8 sm:mb-20 px-4">
        <NextScreenBtn
          btnText="Next"
          onClick={handleNext}
          disabled={!isFormValid}
        />
      </div>
    </div>
  );
}
