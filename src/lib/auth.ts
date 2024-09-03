import { options } from "@/app/api/auth/[...nextauth]/options";
import { NextAuthOptions, getServerSession } from "next-auth";

export const authOptions: NextAuthOptions = options;

export const getAuthSession = () => getServerSession(authOptions);
