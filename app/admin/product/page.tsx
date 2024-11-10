"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/product");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const response = await fetch(`/api/product/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unkown Error");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="h-full flex flex-col bg-blue-900  text-gray-100">
      <header className="flex justify-between items-center p-4 bg-blue-950 shadow-md">
        <h1 className="text-3xl font-bold">My Products</h1>
        <div className="flex items-center space-x-4">
          <Link href="/admin/product/create">
            <button className="btn btn-success">Create Product</button>
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="btn btn-error">
            Logout
          </button>
        </div>
      </header>

      <main className="flex-1 p-4 flex flex-col overflow-y-auto">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-error">{error}</p>
        ) : (
          <div className="flex-1 overflow-x-auto">
            <table className="table  ">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr className="hover:bg-blue-950" key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price.toFixed(2)} ฿</td>
                    <td>{product.stock}</td>
                    <td>
                      <Link href={`/admin/product/edit/${product.id}`}>
                        <button className="btn btn-sm btn-primary">Edit</button>
                      </Link>

                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="btn btn-sm btn-error ml-2">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
