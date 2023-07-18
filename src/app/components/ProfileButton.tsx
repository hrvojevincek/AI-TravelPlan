"use client";
import { ButtonLink } from "./ButtonLink";
import { useSession } from "next-auth/react";

function ProfileButton() {
  const { data: session } = useSession();
  return session?.user ? (
    <ButtonLink href="/profile">Profile</ButtonLink>
  ) : (
    <></>
  );
}

export default ProfileButton;
