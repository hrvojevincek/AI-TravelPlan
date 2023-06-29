"use client";

import { use, useEffect, useState } from "react";
import { useDataContext } from "../dataContext";
import { Activity, ResultData } from "@/types";
import Map from "../api/Map";
import ExactLocation from "../api/ExactLocation";
import mock from "../api/mock.json";
import { setRequestMeta } from "next/dist/server/request-meta";

function ResultsPage() {
  const { data } = useDataContext();

  const [result, setResult] = useState<ResultData>([]);

  async function search() {
    const result = await fetch(
      `/api/search?destination=${data?.destination}&duration=${data?.duration}`,
      { headers: { "Content-Type": "application/json" } }
    );
    console.log("ESTOY AQUI====>", result);
    const responseData = await result.json();
    console.log(responseData);
    setResult(responseData);
  }

  useEffect(() => {
    search();
  }, []);

  return (
    <div className="flex">
      <div className="max-w-2xl p-6 bg-white border border-gray-200 shadow mb-2 rounded-xl">
        {result.map((data, i) => {
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
      </div>
      <div className="flex-grow">
        {result.length > 0 ? (
          <Map
            activities={result.reduce((acc, day) => {
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
