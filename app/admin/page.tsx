'use client'

import { signOut } from "next-auth/react";
import React from "react";

export default function Adminpage() {
  return (
    <div>
      Welcome to admin dashboard
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="w-full bg-blue-600 text-white py-2 rounded ">
        logout
      </button>
    </div>
  );
}
