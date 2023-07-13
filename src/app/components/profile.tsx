"use client";

import PlanCard from "../components/PlanCard";
import Link from "next/link";
import { useLocalStorage } from "@/utils/hooks";

import { useEffect, useState } from "react";
import { ResultData, Search } from "@/types";

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
      <div className="flex">
        <aside
          className="min-w-[25%] h-screen shadow-xl transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="flex flex-col h-full items-center p-6 rounded-lg dark:text-white dark:hover:bg-gray-700 group">
            <div>
              {user.image ? (
                <img className="rounded-full w-40" src={user.image} />
              ) : undefined}
            </div>
            <div className="mt-6">
              <p>{user.name}</p>
              <p> {user.email}</p>
            </div>
            <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                />
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
            </a>
          </div>
        </aside>
        <div className="bg-gray-50 overflow-hidden overflow-y-scroll max-h-screen w-full">
          <p className="font-bold text-black p-10 mt-8 text-left  ">
            Saved Plans
          </p>
          <div className="flex flex-wrap justify-center">
            {savedPlans.map((plan: any, pIndex: number) => {
              return (
                <Link
                  key={plan.id}
                  href={`/result?searchId=${plan.id}&duration=${plan.duration}&destination=${plan.destination}`}
                  onClick={() => {
                    setLocalSearchId(null);
                  }}
                >
                  <div className="p-8">
                    <PlanCard plan={plan} />
                  </div>
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
