"use client";
import { useState } from "react";
import AuthButton from "./AuthButton";
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import SelectPreferences, { SelectOption } from "./SelectPreferences";
import { useSession } from "next-auth/react";
import { SearchData } from "@/types";
import { options } from "@/utils/options";
import { useRouter } from "next/navigation";

function SearchForm({ serverSession }: { serverSession: any }) {
  const [searchData, setSearchData] = useState<SearchData>({
    destination: "",
    duration: "",
    preferences: "",
  });
  const { data: session } = useSession(serverSession);
  let actualsession = session?.user || serverSession?.user;
  const router = useRouter();
  const url =
    process.env.NODE_ENV === "development"
      ? `http://localhost:3000/result?destination=${
          searchData.destination
        }&duration=${searchData.duration}${
          searchData.preferences ? `&preferences=${searchData.preferences}` : ""
        }`
      : `https://ai-travel-plan.vercel.app/result?destination=${
          searchData.destination
        }&duration=${searchData.duration}${
          searchData.preferences ? `&preferences=${searchData.preferences}` : ""
        }`;

  function handleSelectChange(options: SelectOption[] | undefined) {
    setSearchData((prev) => ({
      ...prev,
      preferences: options
        ? options.map((option) => option.value).join(", ")
        : undefined,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(url);
  }

  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <div>
        <div className="mt-3">
          <input
            onChange={(e) => {
              setSearchData({ ...searchData, destination: e.target.value });
            }}
            value={searchData.destination}
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
              setSearchData({ ...searchData, duration: e.target.value });
            }}
            value={searchData.duration}
            id="duration"
            name="duration"
            type="text"
            placeholder="How many days for?"
            required
            className="w-96 text-center rounded-full py-2 px-4 bg-opacity-70 bg-neutral-100 placeholder-icon-time"
          />
        </div>
      </div>
      {actualsession && (
        <div className="mt-2">
          <div className="mt-1">
            <SelectPreferences
              multiple={true}
              placeholder="Select your preferences"
              value={
                searchData.preferences
                  ? searchData.preferences
                      ?.split(", ")
                      .map((v) => ({ label: v, value: v }))
                  : undefined
              }
              onChange={handleSelectChange}
              options={options}
            />
          </div>
        </div>
      )}

      <div className="pt-4 flex items-center gap-8 justify-between">
        <AuthButton
          session={actualsession}
          className=" bg-yellow-400 text-white p-2 px-4 rounded-full"
        />
        <button className="font-bold bg-slate-900 p-2 px-8   text-white rounded-full">
          <ArrowLongRightIcon className="h-6 w-6 text-white" />
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
