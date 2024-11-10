import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'john@doe.com' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password) {
                    return null; // หรือโยนข้อผิดพลาด
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });


                if (user && user.password) {
                    const isValid = await bcrypt.compare(credentials.password, user.password);
                    if (isValid) {
                        const userId = Number(user.id); // แปลงให้เป็น number
                        return {
                            id: userId,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                        };
                    }
                }
                throw new Error('Invalid email or password');


            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            async profile(profile) {

                const userId = Number(profile.sub); // แปลงให้เป็น number
                return {
                    id: userId,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    role: 'member', // คุณสามารถกำหนด role เริ่มต้นได้ที่นี่

                };
            },
        }),

    ],
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = Number(user.id);
                token.role = user.role;
            }

            return token;
        },
        session: async ({ session, token }) => {
            if (session.user) {
                session.user.id = Number(token.id);
                session.user.role = token.role as string;
            }

            return session;
        },
        async redirect({ baseUrl }) {
            return `${baseUrl}/`;
        },
    },

};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
