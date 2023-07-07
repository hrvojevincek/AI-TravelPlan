"use client";

import { useEffect, useState } from "react";
import { useDataContext } from "../dataContext";
import { ResultData } from "@/types";
import Map from "../components/Map";
import ExactLocation from "../components/ExactLocation";
import ChangeMeBtn from "../components/ChangeMeBtn";

function ResultsPage() {
  const { data } = useDataContext();
  const [result, setResult] = useState<ResultData>([]);
  let tryResult: any;

  console.log("WHAT ARE YOU HERE", typeof setResult);

  async function search() {
    const result = await fetch(
      `/api/search?destination=${data?.destination}&duration=${data?.duration}`,
      { headers: { "Content-Type": "application/json" } }
    );
    const responseData = await result.json();
    setResult(responseData);
    tryResult = responseData;
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
                  <div
                    className="`bg-${color}`-200"
                    key={`result-${i}-day-${index}`}
                  >
                    <div>{activity["activity name"]}</div>
                    <div>{activity.duration}</div>
                    <ChangeMeBtn
                      setResult={setResult}
                      duration={activity.duration}
                      activityName={activity["activity name"]}
                      activityIndex={index}
                      dayIndex={i}
                    />

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
