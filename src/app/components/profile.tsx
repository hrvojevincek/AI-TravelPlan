"use client";

import PlanCard from "../components/PlanCard";
import Link from "next/link";
import { useLocalStorage } from "@/utils/hooks";

import { useEffect, useState } from "react";
import { Search } from "@/types";
import ArrowRightIcon from "@heroicons/react/24/outline/ArrowRightOnRectangleIcon";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import BookmarkIcon from "@heroicons/react/24/outline/BookmarkIcon";
import SettingsIcon from "@heroicons/react/24/outline/CogIcon";

function Profile({
  user,
}: {
  user: { email: string; image: string; name: string };
}) {
  const [localSearchId, setLocalSearchId] = useLocalStorage(
    "TravelAISearchId",
    null
  );
  const [savedPlans, setSavedPlans] = useState<Search[]>([]);
  const [loading, setLoading] = useState(true);

  async function getSavedPlans() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      email: user.email,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
    const saved = await fetch("/api/profile", requestOptions);
    const savedPlansData = await saved.json();
    console.log(savedPlansData);
    setSavedPlans(savedPlansData);
  }

  useEffect(() => {
    getSavedPlans();
  }, []);

  return (
    <>
      <div className="flex bg-neutral-100">
        <aside
          className="min-w-[25%] h-screen shadow-xl transition-transform -translate-x-full sm:translate-x-0 bg-white"
          aria-label="Sidebar"
        >
          <div className="flex flex-col h-full items-stretch justify-between px-6 py-24 rounded-lg">
            <div>
              {user.image ? (
                <img className="rounded-full w-40 m-auto" src={user.image} />
              ) : undefined}
              <div className="mt-6 text-center">
                <p className="text-2xl tracking-tight font-bold">{user.name}</p>
                <p className="text-gray-400"> {user.email}</p>
              </div>
              <div className="text-xl font-semibold border-r-2 border-r-zinc-300 mx-8 my-12">
                <Link href="/profile" className="block my-5 text-zinc-300">
                  <UserIcon className="inline w-6 h-6 mr-5 font-light" />
                  <span>User</span>
                </Link>
                <Link
                  href="/profile"
                  className="block my-5 border-r-2 border-r-blue-300"
                >
                  <BookmarkIcon className="inline w-6 h-6 mr-5 font-light" />
                  <span>Saved Plans</span>
                </Link>
                <Link href="/profile" className="block my-5 text-zinc-300">
                  <SettingsIcon className="inline w-6 h-6 mr-5 font-light" />
                  <span>Preferences</span>
                </Link>
              </div>
            </div>
            <a className="flex justify-center items-center p-2 rounded-lg cursor-pointer text-yellow-500">
              <ArrowRightIcon className="w-6 h-6 font-light" />
              <span className="ml-3 whitespace-nowrap font-semibold">
                Sign Out
              </span>
            </a>
          </div>
        </aside>
        <div className="p-24 bg-gray-50 overflow-hidden overflow-y-scroll max-h-screen w-full">
          <p className="font-bold text-black text-left text-3xl tracking-tight">
            Saved Plans
          </p>
          <div className="flex flex-wrap justify-left gap-8 mt-4">
            {savedPlans.map((plan: any, pIndex: number) => {
              return (
                <Link
                  key={plan.id}
                  href={`/result?searchId=${plan.id}&duration=${plan.duration}&destination=${plan.destination}`}
                  onClick={() => {
                    setLocalSearchId(null);
                  }}
                >
                  <PlanCard plan={plan} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
