import { findUserById, createUser } from "@/lib/db/user";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      try {
        const oldUser = await findUserById(user.id);
        if (oldUser) {
          return true;
        }
        if (user.id && user.name && user.email) {
          const newUser = await createUser(user.id, user.name, user.email);
          return true;
        }
        return false;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
  pages: {
    signIn: "/signin",
  },
};
