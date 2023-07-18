"use client";
import { useState } from "react";
import AuthButton from "./AuthButton";
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";

function SearchForm() {
  const [searchData, setSearchData] = useState({});
  return (
    <form
      className="space-y-3"
      action={`/result?${new URLSearchParams(searchData).toString()}`}
      method="GET"
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
      {/* {session?.user && (
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
                )} */}

      <div className="pt-4 flex items-center gap-8 justify-between">
        <AuthButton className=" bg-yellow-400 text-white p-2 px-4 rounded-full" />
        <button className="font-bold bg-slate-900 p-2 px-8   text-white rounded-full">
          <ArrowLongRightIcon className="h-6 w-6 text-white" />
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
