import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prismaClient } from "@repo/db/clients";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("🔍 Auth attempt for:", credentials?.email);
          if (!credentials?.email || !credentials?.password) {
            console.log("❌ Missing credentials");
            return null;
          }
          const user = await prismaClient.user.findUnique({
            where: { email: credentials.email },
          });
          if (!user || !user.password) {
            console.log("❌ User not found or has no password");
            return null;
          }
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValid) {
            console.log("❌ Invalid password");
            return null;
          }
          console.log("✅ Authentication successful");
          return user;
        } catch (error) {
          console.error("💥 Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  debug: true,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log(
        "🔐 JWT callback - token:",
        token?.email,
        "user:",
        user?.email
      );
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username || "";
      }
      return token;
    },
    async session({ session, token }) {
      console.log("📅 Session callback - user:", session?.user?.email);
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        (session.user as any).username = token.username as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log("🔀 Redirect callback:", { url, baseUrl });
      // Return the URL to redirect to after sign in
      if (url.startsWith(baseUrl)) return url;
      // For safety, redirect to dashboard by default
      return `${baseUrl}/dashboard`;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
