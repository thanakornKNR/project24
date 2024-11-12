"use client";

import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  soldCount: number;
}

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  // ดึง base URL ที่ใช้สำหรับ fetch API
  const baseURL = 
  typeof window !== 'undefined'
  ? window.location.origin
  : process.env.NEXTAUTH_URL || '';

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") router.push("/");
    else if (session && session.user?.role === "admin") router.push("/admin");
  }, [router, status, session]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${baseURL}/api/product`);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      }
    };

    fetchProducts();
  }, [baseURL]);

  return (
    <div>
      <Navbar
        isLoggedIn={status === "authenticated"}
        userName={session?.user?.name}
        session={session}
      />
      <main className="p-8 bg-gradient-to-r from-blue-950 to-black">
        <h2 className="text-3xl font-bold mb-4 text-yellow-400">
          Welcome to Weed Shop
        </h2>
        {error && <div className="alert alert-error mb-4">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="card bg-gray-800 shadow-lg border border-purple-600">
                <figure className="relative w-full h-36 sm:h-48 md:h-52 lg:h-[250px] overflow-hidden rounded-lg">
                  <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className="rounded-lg"
                  />
                </figure>

                <div className="p-4">
                  <h3 className="text-xl font-bold text-yellow-300">
                    {product.name}
                  </h3>
                  <p className="text-gray-300">{product.description}</p>
                  <p className="text-green-400 font-bold">
                    {product.price} THB
                  </p>
                  <p className="text-sm text-gray-200">
                    Available Stock: {product.stock}
                  </p>
                  <button className="btn btn-warning mt-4 w-full">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-300">No products available</p>
          )}
        </div>
      </main>
    </div>
  );
}
