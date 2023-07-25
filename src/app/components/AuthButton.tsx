"use client";
import React from "react";
import {
  SessionContextValue,
  signIn,
  signOut,
  useSession,
} from "next-auth/react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid";
import { usePopupCenter } from "@/lib/hooks/useAuthPopup";
import { Session } from "next-auth";

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
  const popupCenter = usePopupCenter();

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
      onClick={() => popupCenter("/google-signin", "Sample Sign In")}
      className={`${className}`}
      {...props}
    >
      Sign In
    </button>
  );
};

export default AuthButton;
