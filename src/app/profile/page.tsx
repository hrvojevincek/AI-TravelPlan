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
    <div className="flex h-screen w-screen content-center justify-center">
      <h1>Loading Profile...</h1>
    </div>
  );
}
