import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const nama = formData.get("nama");
    const deskripsi = formData.get("deskripsi");
    const harga = formData.get("harga");
    const file = formData.get("gambar");

    if (!file) {
      return NextResponse.json(
        { message: "Gambar wajib ada" },
        { status: 400 },
      );
    }

    // Convert file ke buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload ke Cloudinary
    const uploadRes = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "client_products",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        )
        .end(buffer);
    });

    const gambarUrl = uploadRes.secure_url;

    // TODO: simpan ke database
    // contoh:
    // await db.insert({ nama, deskripsi, harga, gambarUrl });

    return NextResponse.json({
      message: "Upload berhasil",
      data: { nama, deskripsi, harga, gambarUrl },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
