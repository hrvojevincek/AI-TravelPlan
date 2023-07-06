"use client";

import { Activity, Day, ResultData } from "@/types";

import { useEffect } from "react";

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
    const activities = day.map((act: Activity) => {
      places.push(act["activity name"]);
    });
  });
  console.log(places);

  async function activity() {
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

  function handleResultChange(activity: Activity) {
    console.log("this is the activity", activity);
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

  return (
    <button
      className="text-white bg-black font-semi py-1 px-2 rounded"
      onClick={activity}
    >
      Change this activity!
    </button>
  );
};

export default ChangeMeBtn;

// { 0x06
//   name: 'arol',
//   age: 36,
//   friends: [ 0x07
//     { 0x08
//       name: 'Hrvoje',
//       age: 36,
//     }, { 0x04
//       name: 'Albert',
//       age: 22
//     }
//   ]
// }

// return {
//   ...person,
//   friends: person.friends.map(f => {
//     if(f.name === 'Hrvoje') {
//       return {
//         ...f,
//         age: 37
//       }
//     }
//     return f
//   })
// }
