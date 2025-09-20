"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { FoodAssignment } from "@/types";
import NextScreenBtn from "@/components/NextScreenBtn";

export default function FoodSplitScreen() {
  const { state, dispatch } = useApp();
  const [assignments, setAssignments] = useState<FoodAssignment[]>([]);

  // Initialize assignments when component mounts or when billItems change
  useEffect(() => {
    if (state.billItems.length > 0) {
      const initialAssignments: FoodAssignment[] = state.billItems.map(
        (_, index) => ({
          foodIndex: index,
          assignedPeople: [],
        })
      );
      setAssignments(initialAssignments);
    }
  }, [state.billItems]);

  const togglePersonAssignment = (foodIndex: number, personId: string) => {
    setAssignments((prev) => {
      // Create a new array to avoid mutation
      const newAssignments = prev.map((assignment, index) => {
        if (index === foodIndex) {
          const currentPeople = assignment.assignedPeople;
          const isCurrentlyAssigned = currentPeople.includes(personId);

          return {
            ...assignment,
            assignedPeople: isCurrentlyAssigned
              ? currentPeople.filter((id) => id !== personId)
              : [...currentPeople, personId],
          };
        }
        return assignment;
      });

      return newAssignments;
    });
  };

  const handleNext = () => {
    dispatch({ type: "SET_FOOD_ASSIGNMENTS", payload: assignments });
    dispatch({ type: "NEXT_STEP" });
  };

  const canProceed =
    assignments.length > 0 &&
    assignments.every((assignment) => assignment.assignedPeople.length > 0);

  // Don't render if we don't have the necessary data
  if (state.billItems.length === 0 || state.people.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h2>
          <p className="text-gray-600">
            Please wait while we prepare your bill items.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 text-blue-800">
          Split Food Items
        </h1>
        <p className="text-center text-gray-700 mb-6 sm:mb-8 text-lg">
          Select who is sharing each food item
        </p>

        <div className="space-y-6">
          {state.billItems.map((item, foodIndex) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: foodIndex * 0.1 }}
              className="bg-gray-50 p-4 sm:p-6 rounded-lg border border-gray-200"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {item.foodName}
                </h3>
                <span className="text-lg font-bold text-blue-800">
                  ${item.price.toFixed(2)}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {state.people.map((person) => {
                  const isChecked =
                    assignments[foodIndex]?.assignedPeople.includes(
                      person.id
                    ) || false;

                  return (
                    <label
                      key={person.id}
                      className={`flex items-center space-x-3 cursor-pointer p-3 rounded-lg border-2 transition-all duration-200 ${
                        isChecked
                          ? "bg-blue-100 border-blue-500 text-blue-900"
                          : "bg-white border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() =>
                          togglePersonAssignment(foodIndex, person.id)
                        }
                        className="w-5 h-5 text-blue-600 border-gray-400 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="text-sm sm:text-base font-medium">
                        {person.name}
                      </span>
                    </label>
                  );
                })}
              </div>

              {assignments[foodIndex]?.assignedPeople.length > 0 && (
                <div className="mt-3 text-sm text-gray-600">
                  <span className="font-medium">
                    {assignments[foodIndex].assignedPeople.length} person(s)
                    selected
                  </span>
                  <span className="ml-2">
                    ($
                    {(
                      item.price / assignments[foodIndex].assignedPeople.length
                    ).toFixed(2)}{" "}
                    per person)
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 flex justify-center">
          <div className="w-full max-w-md">
            <NextScreenBtn
              btnText="Calculate Split"
              onClick={handleNext}
              disabled={!canProceed}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
