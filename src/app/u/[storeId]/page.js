"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaWhatsapp,
  FaUser,
  FaTrash,
  FaPlus,
  FaMinus,
  FaCheck,
} from "react-icons/fa";

import { useParams } from "next/navigation";
import { products } from "@/data/products";
import { formatName } from "@/app/services/formatName";

import Section from "@/components/layouts/Section";
import Input from "@/components/layouts/Input";
import Products from "@/components/ui/Products";
import FloatingCart from "@/components/ui/FloatingCart";

export default function SistemPesananOtomatisFull() {
  const { storeId: param } = useParams();
  const [name, setName] = useState("");
  const [cart, setCart] = useState([]);
  const [note, setNote] = useState("");
  const [toast, setToast] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("List product");
  const [showPreview, setShowPreview] = useState(false);
  const date = new Date();

  const storeName = formatName(param);

  const BRAND = {
    name: storeName || "Dravora",
    tagline: "Pesan Tanpa Ribet, Langsung ke WhatsApp",
    waAdmin: "6282127524908",
  };

  const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
    .getDate()
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
  const formattedTime = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((p) => p.id === product.id);
      if (exist)
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p,
        );
      return [...prev, { ...product, qty: 1 }];
    });
    triggerToast(`${product.name} ditambahkan ke pesanan!`);
  };

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const message = `Halo Admin 👋
Saya ingin memesan melalui ${BRAND.name}

Nama: ${name || "-"}
Pesanan:
${cart
  .map(
    (i, idx) =>
      `${idx + 1}. ${i.name} x${i.qty} = Rp ${(i.price * i.qty).toLocaleString("id-ID")}`,
  )
  .join("\n")}
Total: Rp ${total.toLocaleString("id-ID")}
Tanggal: ${formattedDate || "-"}
Waktu : ${formattedTime || "-"}
Catatan: ${note || "-"}

Mohon konfirmasi 🙏`;

  const waLink = `https://wa.me/${BRAND.waAdmin}?text=${encodeURIComponent(message)}`;

  const handlePreview = () => {
    if (!name.trim()) return triggerToast("Isi nama dulu!");
    if (!cart.length) return triggerToast("Pilih minimal 1 produk!");
    setShowPreview(true);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 relative">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 font-semibold"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="max-w-md mx-auto mb-10">
        {/* COVER */}
        <div className="relative h-32 w-full rounded-3xl overflow-hidden">
          <img
            src={`${param.includes("ayam") ? "https://plus.unsplash.com/premium_photo-1669742928112-19364a33b530?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXlhbXxlbnwwfHwwfHx8MA%3D%3D" : "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RvcmUlMjBiYWp1fGVufDB8fDB8fHww"}`}
            className="w-full h-full object-cover"
          />

          {/* overlay biar readable */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* PROFILE CARD */}
        <div className="relative bg-white rounded-3xl shadow-md px-5 pb-5 pt-12 -mt-10 border-none">
          {/* AVATAR FLOAT */}
          <div className="absolute -top-8 left-5 w-16 h-16 rounded-2xl bg-white shadow flex items-center justify-center text-lg font-bold text-gray-700">
            {BRAND.name?.charAt(0)}
          </div>

          {/* STORE NAME */}
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">{BRAND.name}</h1>

            <div className="flex items-center gap-1 text-blue-600 text-sm font-semibold">
              <FaCheck />
              Verified
            </div>
          </div>

          {/* STATUS */}
          <div className="flex items-center gap-2 text-xs text-green-600 font-medium mt-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Online • Fast Response
          </div>

          {/* TAGLINE */}
          <p className="text-sm text-gray-600 mt-3 leading-relaxed">
            {BRAND.tagline}
          </p>

          {/* STATS */}
          <div className="flex justify-between mt-4 text-center">
            <div>
              <p className="font-bold text-gray-900 text-sm">100+</p>
              <p className="text-xs text-gray-500">Pesanan</p>
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">4.9⭐</p>
              <p className="text-xs text-gray-500">Rating</p>
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">24 Jam</p>
              <p className="text-xs text-gray-500">Respon</p>
            </div>
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-3xl shadow-lg p-6 space-y-8">
        <Section title="Data Pemesan">
          <Input
            icon={<FaUser />}
            label="Nama Lengkap"
            placeholder="Contoh: Budi"
            onChange={setName}
          />
        </Section>

        {/* Search Bar */}
        <Section title="Cari Produk">
          <input
            type="text"
            placeholder="Cari produk favorit..."
            className="w-full pl-5 pr-5 py-4 rounded-2xl bg-white shadow-md border border-gray-100 focus:ring-2 focus:ring-red-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Section>

        {/* Products */}
        <Products
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          filteredProducts={filteredProducts}
          cart={cart}
          addToCart={addToCart}
        />

        {cart.length > 0 && (
          <Section title="Ringkasan Pesanan">
            <div className="space-y-3 bg-gray-50 rounded-2xl p-4">
              {cart.map((i) => (
                <div
                  key={i.id}
                  className="flex justify-between items-center text-sm"
                >
                  <p>{i.name}</p>

                  <span>Jumlah : {i.qty}</span>
                </div>
              ))}
              <div className="border-t pt-3 flex justify-between font-extrabold text-lg">
                <span>Total ({cart.length} item)</span>
                <span className="text-red-600">
                  Rp {total.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          </Section>
        )}

        <Section title="Catatan">
          <textarea
            rows={3}
            placeholder="Catatan tambahan (opsional)"
            className="w-full pl-5 pr-5 py-4 rounded-2xl bg-white shadow-md border border-gray-100 focus:ring-2 focus:ring-red-500 outline-none"
            onChange={(e) => setNote(e.target.value)}
          />
        </Section>

        <button
          onClick={handlePreview}
          className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:scale-[1.02] active:scale-[0.98] transition text-white py-4 rounded-2xl font-extrabold flex items-center justify-center gap-3 shadow-lg"
        >
          <FaWhatsapp size={20} />
          Pesan Sekarang
        </button>
        <p className="text-xs text-center text-gray-400 mt-1">
          Powered by <b>Dravora Id</b>
        </p>
      </div>

      {/* Floating Cart */}
      <FloatingCart
        cart={cart}
        waLink={waLink}
        total={total}
        setCart={setCart}
      />

      {/* Preview */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-xl"
            >
              <h3 className="font-bold text-lg">Preview Pesan</h3>
              <pre className="bg-gray-100 p-4 rounded-xl text-sm whitespace-pre-wrap">
                {message}
              </pre>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPreview(false)}
                  className="w-full bg-gray-200 py-3 rounded-xl"
                >
                  Batal
                </button>
                <a
                  href={waLink}
                  target="_blank"
                  className="w-full bg-red-600 text-white py-3 rounded-xl text-center font-bold"
                >
                  Kirim WA
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
