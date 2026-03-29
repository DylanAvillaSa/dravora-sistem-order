"use client";

import { useEffect, useState } from "react";
import { useDeferredValue } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useRef } from "react";

export default function Home() {
  const inputRef = useRef(null);
  const [storeName, setStoreName] = useState("");
  const deferredStoreName = useDeferredValue(storeName);
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);

  const slugify = (text) => {
    return text.toLowerCase().trim().replace(/\s+/g, "-");
  };

  const handleSubmit = () => {
    if (!storeName.trim()) {
      setShowAlert(true);
      inputRef.current?.focus();

      setTimeout(() => {
        setShowAlert(false);
      }, 2500);

      return;
    }

    router.push(`/u/${slugify(storeName)}`);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-6 flex items-center justify-center relative overflow-hidden pt-10">
      {/* BACKGROUND GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/30 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[500px] h-[500px] bg-blue-600/30 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

      {/* ALERT POPUP */}
      <div
        className={`fixed top-1/2 w-[80%] left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          showAlert
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10 pointer-events-none"
        }`}
      >
        <div className="bg-gradient-to-r flex flex-col from-purple-600 to-blue-600 px-6 py-4 rounded-2xl shadow-2xl border border-white/10 backdrop-blur flex items-center gap-3">
          <p className="text-sm md:text-base font-medium">
            Isi nama toko dulu ya... biar langsung jadi{" "}
            <span className="font-bold">punya sistem order sendiri</span> 🚀
          </p>
        </div>
      </div>

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center z-10">
        {/* LEFT */}
        <div>
          {/* BADGE */}
          <div className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm mb-6 border border-white/10 backdrop-blur">
            🚀 Sistem Order UMKM
          </div>

          {/* TITLE */}
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Jualan Lebih Cepat
            <span className="block bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
              Tanpa Balas Chat Manual
            </span>
          </h1>

          {/* DESC */}
          <p className="mt-5 text-gray-400 text-lg">
            Customer pilih menu sendiri, langsung masuk ke WhatsApp dengan
            format rapi.
            <span className="text-white font-semibold">
              {" "}
              Auto closing tanpa ribet.
            </span>
          </p>

          {/* INPUT */}
          <div className="mt-8">
            <div className="flex gap-3 bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur">
              <input
                type="text"
                placeholder="Contoh: Warung Bu Sari"
                ref={inputRef}
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-transparent outline-none text-white placeholder-gray-500"
              />

              <button
                onClick={handleSubmit}
                className="bg-white text-black px-6 rounded-xl font-semibold hover:scale-105 transition"
              >
                Coba
              </button>
            </div>

            {storeName && (
              <p className="mt-3 text-sm text-gray-500">
                Link kamu:{" "}
                <span className="text-white font-semibold">
                  dravora.my.id/u/{slugify(deferredStoreName)}
                </span>
              </p>
            )}
          </div>

          {/* SOCIAL PROOF */}
          <div className="mt-8 flex items-center gap-4 text-sm text-gray-400">
            <div className="flex -space-x-3">
              <img
                className="w-8 h-8 rounded-full border border-black"
                src="https://i.pravatar.cc/100?img=1"
              />
              <img
                className="w-8 h-8 rounded-full border border-black"
                src="https://i.pravatar.cc/100?img=2"
              />
              <img
                className="w-8 h-8 rounded-full border border-black"
                src="https://i.pravatar.cc/100?img=3"
              />
            </div>
            <p>Memudahkan UMKM</p>
          </div>
        </div>

        {/* RIGHT (SOCIAL MEDIA STYLE PREVIEW) */}
        <div className="relative">
          {/* CARD */}
          <div className="bg-[#1a1a1a] p-4 rounded-3xl shadow-2xl border border-white/10">
            {/* HEADER */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
              <div>
                <p className="font-semibold">Warung Bu Sari</p>
                <p className="text-xs text-gray-400">Online</p>
              </div>
            </div>

            {/* IMAGE */}
            <Image
              src="/images/order-otomatis.png"
              width={500}
              height={400}
              alt="preview"
              className="rounded-2xl mb-4"
            />

            {/* MENU LIST */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <p>Nasi Goreng</p>
                <p>Rp15.000</p>
              </div>
              <div className="flex justify-between">
                <p>Mie Ayam</p>
                <p>Rp12.000</p>
              </div>
              <div className="flex justify-between">
                <p>Es Teh</p>
                <p>Rp5.000</p>
              </div>
            </div>

            {/* BUTTON */}
            <button className="mt-4 w-full bg-green-500 text-black py-3 rounded-xl font-semibold hover:scale-[1.02] transition">
              Pesan via WhatsApp
            </button>
          </div>

          {/* FLOATING ELEMENT */}
          <div className="absolute -top-6 -right-6 bg-white text-black px-4 py-2 rounded-xl text-sm font-semibold shadow-lg">
            Auto Order ⚡
          </div>
        </div>
      </div>
    </div>
  );
}
