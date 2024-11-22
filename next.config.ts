import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',          // ใช้ https สำหรับการโหลดภาพ
        hostname: 'www.shutterstock.com',  // โดเมนแรก
        pathname: '/**',             // ใช้ ** เพื่ออนุญาตให้โหลดภาพจากทุก path
      },
      {
        protocol: 'https',          // ใช้ https สำหรับการโหลดภาพ
        hostname: 'lh3.googleusercontent.com',  // โดเมนที่สอง
        pathname: '/**',             // ใช้ ** เพื่ออนุญาตให้โหลดภาพจากทุก path
      },
    ],
  },
};

export default nextConfig;
