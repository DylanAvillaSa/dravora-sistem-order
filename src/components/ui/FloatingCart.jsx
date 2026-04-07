"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { FaShoppingCart, FaMinus, FaPlus, FaTrash } from "react-icons/fa";

const FloatingCart = ({ cart, waLink, total, setCart }) => {
  const [cartOpen, setCartOpen] = useState(false);

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i,
      ),
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <React.Fragment>
      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white border rounded-2xl shadow-lg w-64 overflow-hidden"
          >
            <div
              className="flex items-center justify-between px-4 py-3 cursor-pointer bg-red-600 text-white font-bold"
              onClick={() => setCartOpen(!cartOpen)}
            >
              <span>
                <FaShoppingCart className="inline mr-2" />
                {cart.length} item
              </span>
              <span>Rp {total.toLocaleString("id-ID")}</span>
            </div>

            {cartOpen && (
              <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
                {cart.map((i) => (
                  <div
                    key={i.id}
                    className="flex justify-between items-center text-sm"
                  >
                    <span>
                      {i.name} x{i.qty}
                    </span>
                    <div className="flex gap-1 items-center">
                      <span>
                        Rp {(i.price * i.qty).toLocaleString("id-ID")}
                      </span>
                      <button
                        onClick={() => updateQty(i.id, -1)}
                        className="text-red-600 p-1 rounded-full hover:bg-red-100 transition"
                      >
                        <FaMinus />
                      </button>
                      <button
                        onClick={() => updateQty(i.id, 1)}
                        className="text-green-600 p-1 rounded-full hover:bg-green-100 transition"
                      >
                        <FaPlus />
                      </button>
                      <button
                        onClick={() => removeFromCart(i.id)}
                        className="text-gray-600 p-1 rounded-full hover:bg-gray-200 transition"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
                <a
                  href={waLink}
                  target="_blank"
                  className="w-full block text-center bg-red-600 text-white py-3 rounded-xl font-bold mt-2"
                >
                  Kirim Pesanan
                </a>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </React.Fragment>
  );
};

export default FloatingCart;
