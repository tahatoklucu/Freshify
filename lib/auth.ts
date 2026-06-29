import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;

        let dbUser = await db.user.findUnique({
          where: { id: user.id },
          select: { profileToken: true },
        });

        if (dbUser && !dbUser.profileToken) {
          const newToken = crypto.randomUUID();
          await db.user.update({
            where: { id: user.id },
            data: { profileToken: newToken },
          });
          dbUser.profileToken = newToken;
        }

        session.user.profileToken = dbUser?.profileToken ?? undefined;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
