"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid";

const Button = ({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  const { data: session } = useSession();

  const popupCenter = (url: string, title: string) => {
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;

    const width =
      window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

    const height =
      window.innerHeight ??
      document.documentElement.clientHeight ??
      screen.height;

    const systemZoom = width / window.screen.availWidth;

    const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
    const top = (height - 550) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(
      url,
      title,
      `width=${500 / systemZoom},height=${
        550 / systemZoom
      },top=${top},left=${left}`
    );

    newWindow?.focus();
  };

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
