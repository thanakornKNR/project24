import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['www.shutterstock.com',
      'lh3.googleusercontent.com'
    ], // เพิ่มโดเมนที่คุณต้องการใช้
  },
};

export default nextConfig;
