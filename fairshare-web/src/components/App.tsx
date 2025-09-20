"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import WelcomeScreen from "@/components/screens/WelcomeScreen";
import FormScreen from "@/components/screens/FormScreen";
import BillScreen from "@/components/screens/BillScreen";
import FoodSplitScreen from "@/components/screens/FoodSplitScreen";
import SummaryScreen from "@/components/screens/SummaryScreen";

const screens = [
  WelcomeScreen,
  FormScreen,
  BillScreen,
  FoodSplitScreen,
  SummaryScreen,
];

export default function App() {
  const { state } = useApp();
  const CurrentScreen = screens[state.currentStep];

  return (
    <div className="min-h-screen bg-white">
      <CurrentScreen />
    </div>
  );
}
