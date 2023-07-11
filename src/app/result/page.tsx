"use client";

import { useEffect, useState } from "react";
import { useDataContext } from "../dataContext";
import { ResultData } from "@/types";
import Map from "../components/Map";
import ExactLocation from "../components/ExactLocation";
import ChangeMeBtn from "../components/ChangeMeBtn";
import LoadingPage from "../loading";

function ResultsPage() {
  const { data } = useDataContext();
  const [result, setResult] = useState<ResultData>([]);
  const [loading, setLoading] = useState<boolean>(true);
  let tryResult: any;

  useEffect(() => {
    const search = async () => {
      const result = await fetch(
        `/api/search?destination=${data?.destination}&duration=${data?.duration}`,
        { headers: { "Content-Type": "application/json" } }
      );
      const responseData = await result.json();
      setResult(responseData);
      tryResult = responseData;
      setLoading(false);
    };
    search();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <div className="flex h-screen w-screen ">
      <div className="overflow-auto p-6 bg-white border border-gray-200 shadow">
        {result.map((dataResponse, i) => {
          return (
            <div
              key={`result-${i}`}
              className="divide-y max-w-2xl p-6 bg-white border border-gray-700 shadow mb-2 rounded-xl"
            >
              <h1 className="font-bold text-xl">Day {i + 1}</h1>
              {dataResponse.map((activity, index) => {
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
                      destination={data !== null ? data.destination : undefined}
                      activityIndex={index}
                      dayIndex={i}
                      result={result}
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
