"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (email === "admin@gmail.com" && password === "123456") {
        document.cookie = "token=login-success; path=/";
        toast.success("Login berhasil 🚀");
        router.push("/upload-produk");
      } else {
        toast.error("Email atau password salah!");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-white to-rose-900 px-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">
        {/* Logo + Brand */}
        <div className="text-center flex items-center flex-col justify-center mb-6 text-slate-800">
          <Image src="/dravora.png" width={120} height={120} alt="logo" />
          <h1 className="text-2xl font-semibold">Dravora</h1>
          <p className="text-sm">Sistem Order Otomatis UMKM</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm text-slate-700">Email</label>
            <input
              type="email"
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-white/10 text-slate-800 border border-white/20 focus:ring-2 focus:ring-rose-500 outline-none placeholder:text-slate-400"
              required
            />
          </div>

          <div>
            <label className="text-sm text-slate-700">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-white/10 text-slate-700 border border-white/20 focus:ring-2 focus:ring-rose-500 outline-none placeholder:text-slate-400"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2 rounded-lg font-medium transition disabled:opacity-50"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-slate-900 mt-6">
          © {new Date().getFullYear()} Dravora. All rights reserved.
        </p>
      </div>
    </div>
  );
}
