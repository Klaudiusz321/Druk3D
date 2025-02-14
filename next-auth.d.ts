// next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      /** Unikalny identyfikator użytkownika */
      id: string;
    } & DefaultSession["user"];
  }

  interface User {
    /** Unikalny identyfikator użytkownika */
    id: string;
  }
}
