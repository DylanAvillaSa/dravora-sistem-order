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
  FaShoppingCart,
  FaImages,
} from "react-icons/fa";

import { useParams } from "next/navigation";

const products = [
  {
    id: "p1",
    name: "Produk 1",
    price: 23000,
    badge: "Best Seller",
    img: "https://picsum.photos/300?1",
    category: "List product",
  },
  {
    id: "p2",
    name: "Produk 2",
    price: 20000,
    badge: "Rekomendasi",
    img: "https://images.unsplash.com/photo-1557006021-b85faa2bc5e2?w=600&auto=format&fit=crop&q=60",
    category: "List Product",
  },
  {
    id: "p3",
    name: "Produk 3",
    price: 33000,
    badge: "Hemat",
    img: "https://images.unsplash.com/photo-1628521061262-19b5cdb7eee5?w=600&auto=format&fit=crop&q=60",
    category: "List product",
  },
  {
    id: "p4",
    name: "Produk 4",
    price: 22000,
    badge: "Hemat",
    img: "https://images.unsplash.com/photo-1582981760753-b52aae38f237?w=600&auto=format&fit=crop&q=60",
    category: "List product",
  },
];

export default function SistemPesananOtomatisFull() {
  const { storeId: param } = useParams();
  const [name, setName] = useState("");
  const [cart, setCart] = useState([]);
  const [note, setNote] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [toast, setToast] = useState("");
  const [activeCategory, setActiveCategory] = useState("List product");
  const [searchTerm, setSearchTerm] = useState(""); // Search Bar
  const [cartOpen, setCartOpen] = useState(false); // Floating Cart

  const formatName = (text) => {
    return text
      .replace(/-/g, " ") // ⬅️ ini yang hilangin "-"
      .replace(/\b\w/g, (char) => char.toUpperCase()); // capitalize
  };

  const storeName = formatName(param);

  const BRAND = {
    name: storeName || "Dravora",
    tagline: "Pesan Tanpa Ribet, Langsung ke WhatsApp",
    waAdmin: "6282127524908",
  };

  const MAX_PRODUCTS = 10;

  const date = new Date();
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

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((i) => i.id !== id));
  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i,
      ),
    );
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

  // Filter products by category + search term
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (cart.length >= MAX_PRODUCTS) {
    return triggerToast("Maksimal 10 produk di versi gratis 😢");
  }

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
            src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=800"
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

          <div className="grid grid-flow-col auto-cols-[48%] gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
            {filteredProducts.map((item) => {
              const inCart = cart.find((i) => i.id === item.id);
              return (
                <motion.div
                  key={item.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => addToCart(item)}
                  className="snap-start cursor-pointer border border-gray-200 rounded-3xl p-3 flex flex-col justify-between items-center hover:border-red-500 transition shadow-md bg-white relative"
                >
                  <div className="w-full text-center relative">
                    <div className="h-40 w-full rounded-2xl object-cover mb-2 bg-gray-300 flex items-center  justify-center">
                      <FaImages className="text-gray-400" size={40} />
                    </div>
                    {item.badge && (
                      <span className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 text-xs font-semibold rounded-full shadow">
                        {item.badge}
                      </span>
                    )}
                    {inCart && (
                      <span className="absolute top-3 right-3 bg-white text-red-600 font-bold px-2 py-1 rounded-full text-sm shadow">
                        {inCart.qty}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex flex-col items-center gap-1">
                    <p className="font-bold text-gray-900 text-center">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-800">
                      Rp {item.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Section>

        {cart.length > 0 && (
          <Section title="Ringkasan Pesanan">
            <div className="space-y-3 bg-gray-50 rounded-2xl p-4">
              {cart.map((i) => (
                <div
                  key={i.id}
                  className="flex justify-between items-center text-sm"
                >
                  <span>
                    {i.name} x{i.qty}
                  </span>
                  <div className="flex gap-2 items-center">
                    <span>Rp {(i.price * i.qty).toLocaleString("id-ID")}</span>
                    <div className="flex gap-1">
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

function Section({ title, children }) {
  return (
    <div className="space-y-3 mb-4">
      <p className="font-bold text-gray-900">{title}</p>
      {children}
    </div>
  );
}

function Input({ icon, label, type = "text", placeholder, onChange }) {
  return (
    <div className="mb-3">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <div className="relative mt-2">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
        <input
          type={type}
          placeholder={placeholder}
          className="w-full pl-10 pr-5 py-4 rounded-2xl bg-white shadow-md border border-gray-100 focus:ring-2 focus:ring-red-500 outline-none"
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
