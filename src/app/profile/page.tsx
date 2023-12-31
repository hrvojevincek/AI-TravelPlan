import { getServerSession } from "next-auth/next";
import Profile from "../components/profile";
import options from "../api/auth/[...nextauth]/options";

export default async function profilePage() {
  const session = await getServerSession(options);

  return session ? (
    <Profile
      user={session.user as { name: string; image: string; email: string }}
    />
  ) : (
    <div className="flex h-screen w-screen content-center justify-center">
      <h1>Loading Profile...</h1>
    </div>
  );
}
