import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    password?: string | null;
  }
  
  interface Session {
    user: {
      id: string;
      password?: string | null;
    } & DefaultSession["user"];
  }
}