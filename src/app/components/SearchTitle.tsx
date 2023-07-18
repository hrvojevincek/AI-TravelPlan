"use client";

import { useSession } from "next-auth/react";

function SearchTitle() {
  const { data: session } = useSession();
  return session?.user ? (
    <h2 className="inline-block w-96 font-bold text-center text-5xl mb-10 text-white drop-shadow-xl">
      Hey{" "}
      {session.user.name?.split(" ")[0].charAt(0).toUpperCase()! +
        session.user.name?.split(" ")[0].slice(1).toLowerCase()!}
      ! <span className="block">Let's start your journey</span>
    </h2>
  ) : (
    <h2 className="inline-block w-96 font-bold text-center text-5xl mb-10 text-white drop-shadow-xl">
      Let's start your journey
    </h2>
  );
}

export default SearchTitle;
