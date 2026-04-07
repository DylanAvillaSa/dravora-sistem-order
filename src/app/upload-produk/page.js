"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

export default function UploadProduk() {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [current, setCurrent] = useState(0);

  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState("");

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const hasToken = document.cookie.includes("token");
    if (!hasToken) {
      router.push("/login");
    }
  }, []);

  // Format Rupiah
  const formatRupiah = (value) => {
    const number = value.replace(/\D/g, "");
    return new Intl.NumberFormat("id-ID").format(number);
  };

  const handleHargaChange = (e) => {
    const raw = e.target.value;
    setHarga(formatRupiah(raw));
  };

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0; path=/";
    toast.success("Berhasil logout 👋");
    router.push("/login");
  };

  // Multi image
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    setFiles(selectedFiles);
    setPreviews(selectedFiles.map((file) => URL.createObjectURL(file)));
    setCurrent(0);
  };

  const removeImage = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);

    setFiles(newFiles);
    setPreviews(newPreviews);
    setCurrent(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) return toast.error("Upload minimal 1 gambar");

    const formData = new FormData();
    files.forEach((file) => formData.append("gambar", file));

    formData.append("nama", nama);
    formData.append("deskripsi", deskripsi);
    formData.append("harga", harga.replace(/\./g, ""));

    setLoading(true);

    const xhr = new XMLHttpRequest();

    xhr.open("POST", "/api/client/products");

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setProgress(percent);
      }
    };

    xhr.onload = () => {
      setLoading(false);
      setProgress(0);

      if (xhr.status === 200) {
        toast.success("Produk berhasil diupload!");
        setFiles([]);
        setPreviews([]);
        setNama("");
        setDeskripsi("");
        setHarga("");
      } else {
        toast.error("Upload gagal");
      }
    };

    xhr.send(formData);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 space-y-5"
      >
        <div className="flex items-center justify-center">
          <Image src="/dravora.png" width={120} height={120} alt="logo" />
        </div>

        <h2 className="text-xl font-semibold text-center text-slate-800">
          Masukan produk anda
        </h2>

        {/* Upload Area */}
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center relative">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />

          {previews.length === 0 ? (
            <div className="text-slate-500">
              <p className="text-sm font-medium">
                Klik atau drag gambar ke sini
              </p>
              <p className="text-xs text-slate-400">
                Bisa upload banyak gambar
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Carousel Preview */}
              <img
                src={previews[current]}
                className="mx-auto h-44 object-contain rounded-lg"
              />

              {/* Navigation */}
              <div className="flex justify-center gap-2">
                {previews.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full ${
                      i === current ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Remove */}
              <button
                type="button"
                onClick={() => removeImage(current)}
                className="text-xs text-red-500"
              >
                Hapus gambar ini
              </button>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Nama Produk"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          <input
            type="text"
            placeholder="Harga Produk"
            value={harga}
            onChange={handleHargaChange}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        <textarea
          placeholder="Deskripsi Produk"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          rows={3}
          required
        />

        {/* Progress Bar */}
        {loading && (
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Floating Logout Button */}
        <div className="fixed top-5 right-5 z-50 group">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
          >
            {/* Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V3"
              />
            </svg>

            <span className="text-sm font-medium">Logout</span>
          </button>

          {/* Tooltip */}
          <span className="absolute right-0 mt-2 text-xs bg-slate-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Keluar dari akun
          </span>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2 rounded-lg font-medium transition disabled:opacity-50"
        >
          {loading ? `Uploading ${progress}%` : "Upload Produk"}
        </button>
      </form>
    </div>
  );
}
