"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { AppState, Person, BillItem, FoodAssignment } from "@/types";

type AppAction =
  | { type: "SET_PEOPLE"; payload: Person[] }
  | { type: "SET_BILL_ITEMS"; payload: BillItem[] }
  | { type: "SET_FOOD_ASSIGNMENTS"; payload: FoodAssignment[] }
  | { type: "SET_TIP_PERCENT"; payload: number }
  | { type: "SET_TAX"; payload: number }
  | { type: "SET_SUBTOTAL"; payload: number }
  | { type: "SET_TOTAL"; payload: number }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "RESET" };

const initialState: AppState = {
  currentStep: 0,
  people: [],
  billItems: [],
  foodAssignments: [],
  tipPercent: 0,
  tax: 0,
  subtotal: 0,
  total: 0,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_PEOPLE":
      return { ...state, people: action.payload };
    case "SET_BILL_ITEMS":
      return { ...state, billItems: action.payload };
    case "SET_FOOD_ASSIGNMENTS":
      return { ...state, foodAssignments: action.payload };
    case "SET_TIP_PERCENT":
      return { ...state, tipPercent: action.payload };
    case "SET_TAX":
      return { ...state, tax: action.payload };
    case "SET_SUBTOTAL":
      return { ...state, subtotal: action.payload };
    case "SET_TOTAL":
      return { ...state, total: action.payload };
    case "NEXT_STEP":
      return { ...state, currentStep: state.currentStep + 1 };
    case "PREV_STEP":
      return { ...state, currentStep: Math.max(0, state.currentStep - 1) };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
