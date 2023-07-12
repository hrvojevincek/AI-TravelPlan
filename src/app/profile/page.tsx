"use client";

import { useSession } from "next-auth/react";
import Profile from "../components/profile";

export default function profilePage() {
  const { data: session } = useSession();

  return session?.user ? (
    <Profile
      user={session.user as { name: string; image: string; email: string }}
    />
  ) : (
    <h1>CARGA HIJO DE PUTA</h1>
  );
}
