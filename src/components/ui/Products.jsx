"use client";

import React from "react";
import ProductScroll from "./ProductScroll";
import Section from "../layouts/Section";

import { motion } from "motion/react";

const Products = ({
  activeCategory,
  filteredProducts,
  cart,
  addToCart,
  setActiveCategory,
}) => {
  return (
    <Section title="Pilih Produk">
      <p className="text-xs text-gray-400 mb-2">
        Klik produk untuk menambah ke pesanan
      </p>
      <div className="flex gap-4 mb-4 text-xs">
        {["List product"].map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            whileTap={{ scale: 0.95 }}
            className={`px-5 py-2 rounded-full font-semibold transition ${
              activeCategory === cat
                ? "bg-red-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* List product */}
      <ProductScroll
        filteredProducts={filteredProducts}
        cart={cart}
        addToCart={addToCart}
      />
    </Section>
  );
};

export default Products;
