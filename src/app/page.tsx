"use client";
import { SearchData } from "@/types";
import Link from "next/link";
import AuthButton from "./components/Button";
import { UserCard } from "./UserCard";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Select, SelectProps } from "antd";
import { useLocalStorage } from "@/utils/hooks";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();
  const [searchData, setSearchData] = useState<SearchData>({});
  const image =
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80";

  const [localSearchId, setLocalSearchId] = useLocalStorage(
    "TravelAISearchId",
    null
  );

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
      {" "}
      <div className="flex justify-center items-center">
        <Image
          src={image}
          layout="fill"
          objectFit="cover"
          alt="plane wing in the sky"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute bg-gray-700 bg-opacity-75 rounded-full w-100 h-100"></div>
          <div className="flex flex-col align-center items-center z-10">
            <h2 className="font-bold text-center text-5xl mb-10">
              Let's start <br />
              your journey
            </h2>

            <div className="mt-4">
              <form
                className="space-y-3"
                action="#"
                method="POST"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div>
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
                      placeholder="Where do you want to go?"
                      className="w-96 text-center rounded-full py-2 px-4 bg-opacity-70 bg-neutral-100"
                    />
                  </div>
                </div>

                <div>
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
                      placeholder="How many days for?"
                      required
                      className="w-96 text-center rounded-full py-2 px-4 bg-opacity-70 bg-neutral-100"
                    />
                  </div>
                </div>
                {session?.user && (
                  <div>
                    <div className="">
                      <label htmlFor="" className="">
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

                <div className="pt-4 flex items-center gap-8 justify-center">
                  <Link
                    href={`/result?${new URLSearchParams(
                      searchData
                    ).toString()}`}
                    className="font-bold bg-yellow-400 p-2 px-4 text-white rounded-full"
                  >
                    Plan my trip
                  </Link>
                  <AuthButton className="border border-yellow-400 text-yellow-400 p-2 px-4 rounded-full" />
                </div>
              </form>
              <div className=""></div>
              {session && <UserCard user={session?.user} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
