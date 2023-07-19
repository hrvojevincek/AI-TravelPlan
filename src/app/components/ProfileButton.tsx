"use client";
import { ButtonLink } from "./ButtonLink";
import { useSession } from "next-auth/react";

function ProfileButton({ serverSession }: { serverSession: any }) {
  const { data: session } = useSession();
  let actualsession = session?.user || serverSession?.user;
  return actualsession ? (
    <ButtonLink href="/profile">Profile</ButtonLink>
  ) : (
    <></>
  );
}

export default ProfileButton;
