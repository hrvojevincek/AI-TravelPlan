"use client";
import { useState } from "react";
import AuthButton from "./AuthButton";
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import SelectPreferences, { SelectOption } from "./SelectPreferences";
import { useSession } from "next-auth/react";
import { SearchData } from "@/types";

function SearchForm({ serverSession }: { serverSession: any }) {
  const [searchData, setSearchData] = useState<SearchData>({});
  const { data: session } = useSession(serverSession);
  let actualsession = session?.user || serverSession?.user;
  const url = `http://localhost:3000/result?destination=${
    searchData.destination
  }&duration=${searchData.duration}${
    searchData.preferences ? `&preferences=${searchData.preferences}` : ""
  }`;

  console.log("preferences ==>>", searchData.preferences);

  const options: SelectOption[] = [
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
      label: "museums",
      value: "museums",
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

  function handleSelectChange(value: SelectOption[] | undefined) {
    setSearchData((prev) => ({
      ...prev,
      preferences: value ? value.map((v) => v.value).join(", ") : undefined,
    }));
  }

  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        document.location.href = url;
      }}
    >
      <div>
        <div className="mt-3">
          <input
            onChange={(e) => {
              setSearchData({ ...searchData, destination: e.target.value });
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
              setSearchData({ ...searchData, duration: e.target.value });
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
