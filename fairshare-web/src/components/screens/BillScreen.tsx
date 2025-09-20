"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { BillItem } from "@/types";
import NextScreenBtn from "@/components/NextScreenBtn";

export default function BillScreen() {
  const { state, dispatch } = useApp();
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [tipPercent, setTipPercent] = useState("");
  const [tax, setTax] = useState("");
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newSubtotal = billItems.reduce((sum, item) => sum + item.price, 0);
    setSubtotal(newSubtotal);

    const tipAmount = ((parseFloat(tipPercent) || 0) / 100) * newSubtotal;
    const taxAmount = parseFloat(tax) || 0;
    setTotal(newSubtotal + tipAmount + taxAmount);
  }, [billItems, tipPercent, tax]);

  const addBillItem = () => {
    if (foodName.trim() && price && parseFloat(price) > 0) {
      const newItem: BillItem = {
        id: `item-${Date.now()}`,
        foodName: foodName.trim(),
        price: parseFloat(price),
      };
      setBillItems([...billItems, newItem]);
      setFoodName("");
      setPrice("");
    }
  };

  const removeBillItem = (id: string) => {
    setBillItems(billItems.filter((item) => item.id !== id));
  };

  const handleNext = () => {
    dispatch({ type: "SET_BILL_ITEMS", payload: billItems });
    dispatch({ type: "SET_TIP_PERCENT", payload: parseFloat(tipPercent) || 0 });
    dispatch({ type: "SET_TAX", payload: parseFloat(tax) || 0 });
    dispatch({ type: "SET_SUBTOTAL", payload: subtotal });
    dispatch({ type: "SET_TOTAL", payload: total });
    dispatch({ type: "NEXT_STEP" });
  };

  const canProceed = billItems.length > 0;

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-6 sm:mb-8 text-blue-800">
          New Bill
        </h1>

        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Enter food"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                className="p-3 sm:p-4 border-2 border-gray-400 rounded-lg text-gray-900 bg-white focus:border-blue-600 focus:outline-none"
              />
              <input
                type="number"
                placeholder="Price ($)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="p-3 sm:p-4 border-2 border-gray-400 rounded-lg text-gray-900 bg-white focus:border-blue-600 focus:outline-none"
                step="0.01"
                min="0"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Tip percent (%)"
                value={tipPercent}
                onChange={(e) => setTipPercent(e.target.value)}
                className="p-3 sm:p-4 border-2 border-gray-400 rounded-lg text-gray-900 bg-white focus:border-blue-600 focus:outline-none"
                min="0"
                max="100"
              />
              <input
                type="number"
                placeholder="Tax ($)"
                value={tax}
                onChange={(e) => setTax(e.target.value)}
                className="p-3 sm:p-4 border-2 border-gray-400 rounded-lg text-gray-900 bg-white focus:border-blue-600 focus:outline-none"
                step="0.01"
                min="0"
              />
            </div>
            <button
              onClick={addBillItem}
              disabled={!foodName.trim() || !price || parseFloat(price) <= 0}
              className="w-full bg-blue-800 text-white py-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Item
            </button>
          </div>

          {/* Totals */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Bill Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tip ({(parseFloat(tipPercent) || 0).toFixed(1)}%):</span>
                <span>
                  $
                  {(((parseFloat(tipPercent) || 0) / 100) * subtotal).toFixed(
                    2
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${(parseFloat(tax) || 0).toFixed(2)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bill Items List */}
        {billItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <h3 className="text-xl font-semibold mb-4">Bill Items</h3>
            <div className="space-y-2">
              {billItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex justify-between items-center p-4 border border-gray-200 rounded-lg bg-white"
                >
                  <span className="font-medium">{item.foodName}</span>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">
                      ${item.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeBillItem(item.id)}
                      className="text-red-600 hover:text-red-800 font-bold"
                    >
                      ×
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Next Button */}
        <div className="flex justify-center mt-8">
          <div className="w-full max-w-md">
            <NextScreenBtn
              btnText="Split Bill"
              onClick={handleNext}
              disabled={!canProceed}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
