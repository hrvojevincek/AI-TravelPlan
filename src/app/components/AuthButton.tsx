"use client";
import { usePopupCenter } from "@/lib/hooks/useAuthPopup";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const AuthButton = ({
  className,
  session,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  session: { email: string; name: string; image: string } | undefined;
}) => {
  const router = useRouter();

  if (session) {
    return (
      <>
        {/* <div className="flex gap-4"> */}
        {/* <p className="text-sky-600">{session.user.name}</p> */}
        <button
          type="button"
          onClick={() => signOut()}
          className={`${className}`}
          {...props}
        >
          <ArrowRightOnRectangleIcon className="inline w-4 h-4 mr-1" />
          <span>Sign Out</span>
        </button>
        {/* </div> */}
      </>
    );
  }
  return (
    <button
      type="button"
      onClick={() => router.push("/signin")}
      className={`${className}`}
      {...props}
    >
      Sign In
    </button>
  );
};

export default AuthButton;
