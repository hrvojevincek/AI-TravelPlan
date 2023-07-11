"use client";

import { useEffect, useState } from "react";
import { ResultData } from "@/types";
import Map from "../components/Map";
import ExactLocation from "../components/ExactLocation";
import ChangeMeBtn from "../components/ChangeMeBtn";
import { useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import SavePlanButton from "../components/SavePlanButton";
import SavePlanModal from "../components/SavePlanModal";

function ResultsPage() {
  const [result, setResult] = useState<ResultData>([]);
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination");
  const duration = searchParams.get("duration");
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function search() {
    const result = await fetch(
      `/api/search?destination=${destination}&duration=${duration}`,
      { headers: { "Content-Type": "application/json" } }
    );
    const responseData = await result.json();
    setResult(responseData);
  }

  useEffect(() => {
    search();
  }, []);

  async function handleSave(hasBeenChecked: boolean, update = false) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      email: session?.user?.email,
      response: result,
      hasBeenChecked,
      update,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
    const isSaved = await fetch(
      `/api/search?destination=${destination}&duration=${duration}`,
      requestOptions
    );
    if (isSaved.status === 200) {
      const saved = await isSaved.json();
      alert(saved.message);
    }
    if (isSaved.status === 201) {
      setIsModalOpen(true);
    }
  }

  return (
    <div className="flex h-screen w-screen ">
      <div className="overflow-auto p-6 bg-white border border-gray-200 shadow">
        <div className="flex justify-end w-full p-2 ">
          <SavePlanButton handleSave={handleSave} />
        </div>
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
                      destination={destination ? destination : undefined}
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
      {isModalOpen && (
        <SavePlanModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          destination={destination || ""}
          duration={duration || ""}
          handleSave={handleSave}
        />
      )}
    </div>
  );
}

export default ResultsPage;
