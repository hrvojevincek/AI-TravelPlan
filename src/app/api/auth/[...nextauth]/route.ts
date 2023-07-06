import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../../../../db";

// Initialize NextAuth

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        console.log("USER", user);
        console.log("ACOUNT", account);
        console.log("PROFILE", profile);
        console.log("USER", email);
        console.log("CREDENTIALS", credentials);
        const oldUser = await prisma.user.findUnique({
          where: {
            id: user.id,
          },
        });
        if (oldUser) {
          return true;
        }
        if (user.id && user.name && user.email) {
          const newUser = await prisma.user.create({
            data: {
              id: user.id,
              username: user.name,
              email: user.email,
            },
          });
          return true;
        }
        return false;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
