"use client";
import { SearchData } from "@/types";
import Link from "next/link";
// import { default as Video } from "./components/Video";
import Button from "./components/Button";
import { UserCard } from "./UserCard";
import { useSession } from "next-auth/react";
import { useState } from "react";
import LoadingPage from "./loading";
import { Select, SelectProps } from "antd";

export default function Home() {
  const { data: session } = useSession();

  const [searchData, setSearchData] = useState<SearchData>({});

  const options: SelectProps["options"] = [
    {
      label: "art",
      value: "art",
    },
    {
      label: "architecture",
      value: "architecture",
    },
    {
      label: "beaches",
      value: "beaches",
    },
    {
      label: "musseums",
      value: "musseums",
    },
    {
      label: "nature",
      value: "nature",
    },
    {
      label: "sports",
      value: "sports",
    },
  ];
  const handleChange = (value: string[]) => {
    setSearchData((prev) => {
      return { ...prev, preferences: value.join(", ") };
    });
  };

  return (
    <>
      {/* <Video /> */}
      <div className="flex flex-col md:flex-row top-0 absolute h-screen w-screen">
        <div className="h-screen flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <h2 className="mt-3 mb-10 text-center text-5xl font-bold leading-9 tracking-tight text-white">
            Welcome to Travel Plan
          </h2>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-3"
              action="#"
              method="POST"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div>
                <label
                  htmlFor=""
                  className="block text-md font-bold leading-5 text-white"
                >
                  ENTER YOUR DESTINATION
                </label>
                <div className="mt-3">
                  <input
                    onChange={(e) => {
                      setSearchData((prev) => {
                        return { ...prev, destination: e.target.value };
                      });
                    }}
                    id="destination"
                    name="destination"
                    type="text"
                    required
                    placeholder="Barcelona"
                    className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-3 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor=""
                    className="block text-md font-bold leading-6 text-white"
                  >
                    AND DURATION
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    onChange={(e) => {
                      setSearchData((prev) => {
                        return { ...prev, duration: e.target.value };
                      });
                    }}
                    id="duration"
                    name="duration"
                    type="text"
                    placeholder="3-day trip"
                    required
                    className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {session?.user && (
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor=""
                      className="block text-md font-bold leading-6 text-white"
                    >
                      AND PREFERENCES
                    </label>
                  </div>
                  <div className="mt-2">
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Select preferences"
                      value={searchData.preferences?.split(", ")}
                      onChange={handleChange}
                      options={options}
                    />
                  </div>
                </div>
              )}
              <div className="bg-black text-white">
                <Link
                  href={`/result?${new URLSearchParams(searchData).toString()}`}
                >
                  <button
                    // href="/result"
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300"
                  >
                    Plan my trip
                  </button>
                </Link>
              </div>
            </form>
            <div className="bg-white">
              <Button />
              {session && <UserCard user={session?.user} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
