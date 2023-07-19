import prisma from "../../../../lib/db";
import GoogleProvider from "next-auth/providers/google";

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      try {
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
};
export default options;
