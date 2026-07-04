import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) {
          return null;
        }
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );
        if (!isPasswordValid) {
          return null;
        }
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session) {
        token.name = session.name;
        token.picture = session.image;
      }

      if (user) {
        token.id = user.id;
        const dbUser = await db.user.findUnique({
          where: { id: user.id },
          select: { profileToken: true, password: true },
        });

        token.password = dbUser?.password;

        if (dbUser && !dbUser.profileToken) {
          const newToken = crypto.randomUUID();
          await db.user.update({
            where: { id: user.id },
            data: { profileToken: newToken },
          });
          token.profileToken = newToken;
        } else {
          token.profileToken = dbUser?.profileToken;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).profileToken = token.profileToken;
        (session.user as any).password = token.password;
        
        const dbUser = await db.user.findUnique({
          where: { id: session.user.id },
          select: { name: true, image: true },
        });

        if (dbUser) {
          session.user.name = dbUser.name;
          session.user.image = dbUser.image;
        }
      }
      return session;
    },
  },
};
