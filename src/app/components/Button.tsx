"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid";
import { usePopupCenter } from "@/lib/hooks/useAuthPopup";

const Button = ({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  const { data: session } = useSession();
  const popupCenter = usePopupCenter();

  if (session && session.user) {
    return (
      <>
        {/* <div className="flex gap-4"> */}
        {/* <p className="text-sky-600">{session.user.name}</p> */}
        <button onClick={() => signOut()} className={`${className}`} {...props}>
          <ArrowRightOnRectangleIcon className="inline w-4 h-4 mr-1" />
          <span>Sign Out</span>
        </button>
        {/* </div> */}
      </>
    );
  }
  return (
    <button
      onClick={() => popupCenter("/google-signin", "Sample Sign In")}
      className={`${className}`}
      {...props}
    >
      Sign In
    </button>
  );
};

export default Button;
