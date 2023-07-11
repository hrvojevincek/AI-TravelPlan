import NextAuth from "next-auth";
import options from "./options";
import { signIn } from "next-auth/react";

// Initialize NextAuth

const handler = NextAuth(options);

export { handler as GET, handler as POST };
