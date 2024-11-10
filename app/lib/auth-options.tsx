import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

const authOptions: NextAuthOptions = {
    providers: [
        // Credentials provider for custom login
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'john@doe.com' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null; // If no credentials are provided, return null
                }

                // Fetch the user from the database
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (user && user.password) {
                    // Check the password hash
                    const isValid = await bcrypt.compare(credentials.password, user.password);
                    if (isValid) {
                        // Return the user info if valid
                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                        };
                    }
                }
                throw new Error('Invalid email or password');
            },
        }),

        // Google provider for OAuth login
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            async profile(profile) {
                // Convert Google profile data into a format that NextAuth expects
                return {
                    id: Number(profile.sub), // Make sure to cast the user ID to number
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    role: 'member', // Default role
                };
            },
        }),
    ],

    // Using Prisma adapter for NextAuth.js
    adapter: PrismaAdapter(prisma),

    // JWT-based session handling
    session: {
        strategy: 'jwt',
    },

    // Callbacks for additional processing
    callbacks: {
        // Store user info in the JWT token
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = Number(user.id); // Store the user ID in the token
                token.role = user.role; // Store the user role in the token
            }
            return token;
        },

        // Store JWT token information in session
        session: async ({ session, token }) => {
            if (session.user) {
                session.user.id = Number(token.id); // Attach the user ID to the session
                session.user.role = token.role as string; // Attach the user role to the session
            }
            return session;
        },

        // Redirect after sign-in or sign-out
        async redirect({ baseUrl }) {
            return `${baseUrl}/`; // Return to the base URL after redirection
        },
    },
};

// Export the NextAuth handler for both GET and POST methods
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, authOptions };
