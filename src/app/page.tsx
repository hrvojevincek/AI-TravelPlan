"use client";
import { SearchData } from "@/types";
import Link from "next/link";
import AuthButton from "./components/Button";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Select, SelectProps } from "antd";
import { useLocalStorage } from "@/utils/hooks";
import Image from "next/image";
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import VoyagoLogo from "../../public/voyago-logo.svg";
import { ButtonLink } from "./components/ButtonLink";

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
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="absolute h-full w-full">
          <Image
            src={image}
            fill
            className="object-cover"
            alt="plane wing in the sky"
          />
        </div>

        <div className="fixed top-4 right-4">
          <ButtonLink href="/profile">Profile</ButtonLink>
        </div>

        <Image src={VoyagoLogo} alt="Voyago Logo" className="relative mb-8" />

        <div className="relative w-[600px] h-[600px]">
          <div className="absolute rounded-full w-full h-full bg-neutral-500 bg-opacity-10 backdrop-blur-md"></div>
          <div className="relative h-[600px] flex flex-col justify-center items-center z-10">
            {session?.user ? (
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
            )}

            <div className="mt-4">
              <form
                className="space-y-3"
                action={`/result?${new URLSearchParams(searchData).toString()}`}
                method="GET"
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
                      className="w-96 text-center rounded-full py-2 px-4 bg-opacity-70 bg-neutral-100 placeholder-icon-time"
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
                      className="w-96 text-center rounded-full py-2 px-4 bg-opacity-70 bg-neutral-100 placeholder-icon-time"
                    />
                  </div>
                </div>
                {session?.user && (
                  <div className="mt-2">
                    <label
                      htmlFor=""
                      className="font-semibold text-white drop-shadow-md tracking-tighter"
                    >
                      And preferences:
                    </label>
                    <div className="mt-1">
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

                <div className="pt-4 flex items-center gap-8 justify-between">
                  <AuthButton className=" bg-yellow-400 text-white p-2 px-4 rounded-full" />
                  <Link
                    href={`/result?${new URLSearchParams(
                      searchData
                    ).toString()}`}
                    className="font-bold bg-slate-900 p-2 px-8   text-white rounded-full"
                  >
                    <ArrowLongRightIcon className="h-6 w-6 text-white" />
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* {session && <UserCard user={session?.user} />} */}
      </div>
    </>
  );
}
