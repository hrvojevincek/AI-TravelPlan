"use client";

import { Activity, Day, ResultData } from "@/types";
import Image from "next/image";
import refresh from "../../../public/refresh.svg";
import { useState, useEffect } from "react";

interface ChangeMeBtnProps {
  duration: string;
  destination: string | undefined;
  activityIndex: number;
  dayIndex: number;
  result: ResultData;
  setResult: React.Dispatch<React.SetStateAction<ResultData>>;
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  setSelectedActivity: React.Dispatch<React.SetStateAction<string>>;
}

const ChangeMeBtn: React.FC<ChangeMeBtnProps> = ({
  setSelectedActivity,
  duration,
  destination,
  activityIndex,
  dayIndex,
  setResult,
  result,
  setActivities,
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
    setActivities(
      result
        .map((originalDay, index) => {
          if (dayIndex === index) {
            return originalDay.map((originalActivity, j) => {
              if (j === activityIndex) {
                return activity;
              }
              return originalActivity;
            });
          }
          return originalDay;
        })
        .flat()
    );
    setSelectedActivity("");
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
    console.log(parsedData);
    handleResultChange(parsedData[0]);
  }

  return (
    <button className="mr-4 hover:fill-gray-400" onClick={changeActivity}>
      <Image
        className="hover:fill-black"
        alt="Change it!"
        src={refresh}
      ></Image>
    </button>
  );
};

export default ChangeMeBtn;
