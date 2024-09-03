import { getAuthSession } from "@/lib/auth";
import ProfilePage from "../components/ProfilePage";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/google-signin");
  }

  return (
    <ProfilePage
      user={session.user as { name: string; image: string; email: string }}
    />
  );
}
