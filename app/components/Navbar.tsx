import React from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Session } from "next-auth";


const Navbar: React.FC<{
  isLoggedIn: boolean;
  userName?: string | null;
  session: Session | null;
}> = ({ isLoggedIn, userName, session }) => {
  return (
    <nav className="bg-gradient-to-r from-blue-950 to-black border-b border-gray-700">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* โลโก้ */}
        <Link href="/" className="text-2xl font-semibold text-yellow-300">
          Weed Shop
        </Link>

        {/* ส่วนการทำงานของผู้ใช้ */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              {/* ไอคอนตะกร้าสินค้า */}
              <div className="dropdown dropdown-end">
                <button
                  tabIndex={0}
                  className="btn btn-ghost btn-circle"
                  aria-label="Cart"
                >
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="badge badge-sm indicator-item">8</span>
                  </div>
                </button>
                
                {/* Dropdown รายละเอียดตะกร้า */}
                <div
                  tabIndex={0}
                  className="dropdown-content card card-compact bg-base-100 z-10 mt-3 w-52 shadow-lg"
                >
                  <div className="card-body">
                    <span className="text-lg font-bold">8 Items</span>
                    <span className="text-info">Subtotal: $999</span>
                    <div className="card-actions mt-2">
                      <button className="btn btn-primary btn-block">View cart</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ไอคอนโปรไฟล์ผู้ใช้ */}
              <div className="dropdown dropdown-end z-10">
                <label
                  tabIndex={0}
                  className="btn btn-circle avatar"
                  aria-label="User Profile"
                >
                  <div className="w-10 rounded-full">
                    <Image
                      src={session?.user?.image || "/default-avatar.png"}
                      alt="user photo"
                      width={40}
                      height={40}
                      className="object-cover rounded-full"
                    />
                  </div>
                </label>

                {/* Dropdown เมนูโปรไฟล์ */}
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <span className="text-gray-400 font-semibold">
                      {userName || "ผู้ใช้"}
                    </span>
                  </li>
                  <li>
                    <Link href="/profile">โปรไฟล์</Link>
                  </li>
                  <li>
                    <button onClick={() => signOut({ callbackUrl: "/" })}>
                      ออกจากระบบ
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <Link href="/login" className="btn btn-warning">
              เข้าสู่ระบบ
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
