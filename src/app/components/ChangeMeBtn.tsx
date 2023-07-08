"use client";

import { Activity, Day, ResultData } from "@/types";
import { useState, useEffect } from "react";

interface ChangeMeBtnProps {
  duration: string;
  destination: string | undefined;
  activityIndex: number;
  dayIndex: number;
  result: ResultData;
  setResult: React.Dispatch<React.SetStateAction<ResultData>>;
}

const ChangeMeBtn: React.FC<ChangeMeBtnProps> = ({
  duration,
  destination,
  activityIndex,
  dayIndex,
  setResult,
  result,
}) => {
  let places: string[] = [];
  result.forEach((day: Day) => {
    day.map((act: Activity) => {
      places.push(act["activity name"]);
    });
  });

  function handleResultChange(activity: Activity) {
    setResult((prev) => {
      return prev.map((originalDay, index) => {
        if (dayIndex === index) {
          return originalDay.map((originalActivity, j) => {
            if (j === activityIndex) {
              return activity;
            }
            return originalActivity;
          });
        }
        return originalDay;
      });
    });
  }

  async function changeActivity() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({ activityNamesArray: places });
    const requestOptions = { method: "POST", headers: myHeaders, body: raw };

    const changeResult = await fetch(
      `/api/activity?duration=${duration}&destination=${destination}`,
      requestOptions
    );

    const responseData = await changeResult.json();
    const parsedData = JSON.parse(responseData);

    handleResultChange(parsedData[0]);
  }

  return (
    <button
      className="text-white bg-black font-semi py-1 px-2 rounded"
      onClick={changeActivity}
    >
      Change this activity!
    </button>
  );
};

export default ChangeMeBtn;
