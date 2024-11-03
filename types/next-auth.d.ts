// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth'


declare module "next-auth" {
  interface Session {
    user: {
      id: number; // คงให้เป็น number เพราะเป็น Int ในฐานข้อมูล
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    }
  }

  interface User {
    id: number; // คงให้เป็น number เพราะเป็น Int
    role: string;
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser {
    id: number; // คงให้เป็น number
    role?: string; 
  }
}
