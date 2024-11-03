'use client'

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

interface SessionProviderWrapperProps {
  session: Session | null; // รองรับ null
  children: React.ReactNode;
}

const SessionProviderWrapper = ({ session, children }: SessionProviderWrapperProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default SessionProviderWrapper;
