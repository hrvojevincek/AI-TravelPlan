import NextAuth from "next-auth";
import options from "./options";

// Initialize NextAuth

const handler = NextAuth(options);

export { handler as GET, handler as POST };

