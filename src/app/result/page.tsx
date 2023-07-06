"use client";

import { useEffect, useState } from "react";
import { useDataContext } from "../dataContext";
import { ResultData } from "@/types";
import Map from "../api/Map";
import ExactLocation from "../api/ExactLocation";
import { useSession } from "next-auth/react";

function ResultsPage() {
  const { data } = useDataContext();

  const [result, setResult] = useState<ResultData>({});

  const { data: session } = useSession();

  async function search() {
    const result = await fetch(
      `/api/search?destination=${data?.destination}&duration=${data?.duration}`,
      { headers: { "Content-Type": "application/json" } }
    );
    const responseData = await result.json();
    setResult(responseData);
  }

  useEffect(() => {
    search();
  }, []);

  async function handleSave() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      searchId: result.id,
      user: session?.user,
    });
    const reqOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
    const response = await fetch(`/api/search`, reqOptions);
    if (response.status === 200) {
      alert("Plan saved correctly");
      return;
    }
    throw new Error("cant save plan");
  }

  return (
    <div className="flex">
      <div className="max-w-2xl p-6 bg-white border border-gray-200 shadow mb-2 rounded-xl">
        {result.response?.map((data, i) => {
          return (
            <div
              key={`result-${i}`}
              className="divide-y max-w-2xl p-6 bg-white border border-gray-200 shadow mb-2 rounded-xl"
            >
              <h1 className="font-bold text-xl">Day {i + 1}</h1>
              {data.map((activity, index) => {
                return (
                  <div key={`result-${i}-day-${index}`}>
                    <div>{activity["activity name"]}</div>
                    <div>{activity.duration}</div>
                    {/* <div>{activity.address}</div> */}
                    <ExactLocation address={activity.address} />
                  </div>
                );
              })}
            </div>
          );
        })}
        <button onClick={handleSave}>Save</button>
      </div>
      <div className="flex-grow">
        {result.response ? (
          <Map
            activities={result.response.reduce((acc, day) => {
              return [...acc, ...day];
            }, [])}
          />
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

export default ResultsPage;
