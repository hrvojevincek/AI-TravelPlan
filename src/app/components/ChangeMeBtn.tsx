"use client";
import { Activity, ResultData } from "@/types";
import { useEffect } from "react";

interface ChangeMeBtnProps {
  duration: string;
  activityName: string;
  activityIndex: number;
  dayIndex: number;
  setResult: React.Dispatch<React.SetStateAction<ResultData>>;
}

const ChangeMeBtn: React.FC<ChangeMeBtnProps> = ({
  duration,
  activityName,
  activityIndex,
  dayIndex,
  setResult,
}) => {
  async function activity() {
    const changeResult = await fetch(
      `/api/activity?duration=${duration}&activityName=${activityName}`,
      { headers: { "Content-Type": "application/json" } }
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
      className="text-white bg-gray-300 font-bold py-2 px-4 rounded"
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
