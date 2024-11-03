"use client";

import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { data: session, status } = useSession();
  const route = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      route.push("/");
    }
  }, [route, status]);
  return (
    <div>
      <div>Profile Page</div>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : session ? (
        <div>
          <h1>Hi คุณ {session.user?.name || "User"}!</h1>
          <div>Email: {session.user?.email || "N/A"}</div>
          <div>Role: {session.user?.role || "N/A"}</div>
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="w-full bg-blue-600 text-white py-2 rounded">
        Logout
      </button>
    </div>
  );
  
}
