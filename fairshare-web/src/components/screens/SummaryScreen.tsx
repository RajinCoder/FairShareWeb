"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { PersonDues } from "@/types";

export default function SummaryScreen() {
  const { state, dispatch } = useApp();
  const [isCalculating, setIsCalculating] = useState(true);
  const [duesData, setDuesData] = useState<PersonDues[]>([]);

  useEffect(() => {
    const calculateDues = (): PersonDues[] => {
      const duesMap = new Map<string, number>();

      // Initialize dues for each person
      state.people.forEach((person) => {
        duesMap.set(person.id, 0);
      });

      // Calculate food item shares
      state.foodAssignments.forEach((assignment, foodIndex) => {
        const foodItem = state.billItems[foodIndex];
        const sharePerPerson =
          foodItem.price / assignment.assignedPeople.length;

        assignment.assignedPeople.forEach((personId) => {
          const currentDues = duesMap.get(personId) || 0;
          duesMap.set(personId, currentDues + sharePerPerson);
        });
      });

      // Calculate tip and tax distribution
      const totalFoodCost = state.billItems.reduce(
        (sum, item) => sum + item.price,
        0
      );
      const tipAndTaxAmount = state.total - totalFoodCost;

      const finalDues: PersonDues[] = [];
      duesMap.forEach((foodDues, personId) => {
        const person = state.people.find((p) => p.id === personId);
        if (person) {
          // Proportional tip and tax based on food share
          const tipTaxShare =
            totalFoodCost > 0
              ? (foodDues / totalFoodCost) * tipAndTaxAmount
              : 0;
          const totalDues = foodDues + tipTaxShare;

          finalDues.push({
            person: person.name,
            amount: Math.round(totalDues * 100) / 100,
          });
        }
      });

      return finalDues.sort((a, b) => b.amount - a.amount);
    };

    const timeoutId = setTimeout(() => {
      setIsCalculating(false);
      setDuesData(calculateDues());
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [state]);

  const handleStartOver = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 text-blue-800">
          Your Share
        </h1>

        {isCalculating ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-800 mb-8"></div>
            <h2 className="text-xl sm:text-2xl font-light mb-8 text-gray-900">
              Calculating your Fair Share
            </h2>
            <p className="text-base sm:text-lg text-gray-700 italic text-center">
              "Never pay more than your fair share again"
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {duesData.map((due, index) => (
              <motion.div
                key={due.person}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-gray-50 p-4 sm:p-6 rounded-lg border-l-4 border-blue-800"
              >
                <div className="flex justify-between items-center">
                  <span className="text-lg sm:text-xl font-semibold text-gray-900">
                    {due.person}
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-green-600">
                    ${due.amount.toFixed(2)}
                  </span>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: duesData.length * 0.1 }}
              className="mt-8 p-6 bg-blue-50 rounded-lg border-2 border-blue-200"
            >
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-800">
                  Total Bill:
                </span>
                <span className="text-3xl font-bold text-blue-800">
                  ${state.total.toFixed(2)}
                </span>
              </div>
            </motion.div>

            <div className="mt-8 flex justify-center">
              <div className="w-full max-w-md">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleStartOver}
                  className="w-full h-16 bg-gray-600 text-white rounded-lg font-semibold text-lg hover:bg-gray-700 transition-colors"
                >
                  Start New Bill
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
