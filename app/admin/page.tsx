"use client";

import React from "react";
import { signOut } from "next-auth/react";

export default function AdminDashboard() {
  return (
    <div className="h-full flex flex-col bg-blue-900 text-gray-100">
      <header className="flex justify-between items-center p-4 bg-blue-950 shadow-md">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="btn btn-error"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="p-6 flex-1">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-800 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold text-gray-200">Total Products</h3>
            <p className="text-3xl font-bold text-gray-100">100</p> {/* Replace with actual data */}
          </div>
          <div className="bg-blue-800 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold text-gray-200">Total Users</h3>
            <p className="text-3xl font-bold text-gray-100">200</p> {/* Replace with actual data */}
          </div>
          <div className="bg-blue-800 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold text-gray-200">Total Orders</h3>
            <p className="text-3xl font-bold text-gray-100">50</p> {/* Replace with actual data */}
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Real-Time Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-700 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold text-gray-200">Users Online</h3>
            <p className="text-3xl font-bold text-green-400">15</p> {/* Replace with actual data */}
          </div>
          <div className="bg-blue-700 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold text-gray-200">Total Sales</h3>
            <p className="text-3xl font-bold text-yellow-300">฿50,000</p> {/* Replace with actual data */}
          </div>
        </div>
      </main>
    </div>
  );
}
