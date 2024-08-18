import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcryptjs from "bcryptjs";
import { userLoginSchema } from "@/schema/userLogin";
import prisma from "./db";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "string" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        try {
          console.log(credentials);

          const parsedInput = userLoginSchema.safeParse(credentials);

          if (parsedInput.success === false) {
            throw new Error("Invalid input");
          }

          const { email, password } = parsedInput.data;

          const user = await prisma.user.findFirst({
            where: {
              email,
            },
          });

          if (!user) {
            throw new Error("No user found with this email");
          }
          const isPasswordCorrect = await bcryptjs.compare(
            password,
            user.password
          );
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Incorrect password");
          }
        } catch (err: any) {
          console.log(err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id.toString(); // Convert ObjectId to string
        token.email = user.email; // Convert ObjectId to string
      }
      console.log("token");
      console.log(token);
      return token;
    },
    async session({ session, token }) {
      if (token) {
        if (session.user !== undefined) {
          session.user.id = token.id;
          session.user.email = token.email;
        }
      }
      console.log("session");
      console.log(session);
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
};
