import Image from "next/image";
import Link from "next/link";
import React from "react";
import SavePlanButton from "./SavePlanButton";
import { ButtonLink } from "./ButtonLink";
import ChangeActivityBtn from "./ChangeActivityBtn";
import { ClockIcon } from "@heroicons/react/20/solid";
import ExactLocation from "./ExactLocation";
import logo from "../../../public/logo.svg";

interface ActivityProps {
  duration: string;
  destination: string;
  result: Array<
    Array<{
      "activity name": string;
      duration: string;
      address: string;
    }>
  >;
  setSelectedActivity: React.Dispatch<React.SetStateAction<string>>;
  selectedActivity: string;
  setActivities: (activities: any) => void;
  setResult: (result: any) => void;
  onHandleSelectedActivity: (activity: string) => void;
  handleSave: () => void;
}

const ActivityComponent: React.FC<ActivityProps> = ({
  duration,
  destination,
  result,
  setSelectedActivity,
  selectedActivity,
  setActivities,
  setResult,
  onHandleSelectedActivity,
  handleSave,
}) => {
  return (
    <div
      className="relative overflow-auto p-6 bg-white shadow-md z-10"
      onClick={() => {
        setSelectedActivity("");
      }}
    >
      <div className="w-full mb-10 flex justify-between items-center">
        <Link href="/">
          <Image src={logo} alt="Best company ever" />
        </Link>
        <div className="mt-4 sm:mt-0 flex items-center">
          <SavePlanButton handleSave={handleSave} />
          <ButtonLink className="ml-2" href="/profile">
            Profile
          </ButtonLink>
        </div>
      </div>
      <div className="text-4xl w-full flex align-middle mt-10 text-black font-extrabold">
        <h1>View {duration} day itinerary</h1>
      </div>
      {result.map((dataResponse, i) => {
        return (
          <div key={`result-${i}`} className=" max-w-2xl mt-7 pt-6">
            <h1 className="text-lg font-semibold mb-2">Day {i + 1}</h1>
            {dataResponse.map((activity, index) => {
              return (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onHandleSelectedActivity(activity["activity name"]);
                  }}
                  className={`flex justify-stretch border-2 hover:border-zinc-400 p-4 rounded-md mb-4 max-w-sm cursor-pointer 
                ${
                  activity["activity name"] === selectedActivity
                    ? "border-zinc-700"
                    : "border-zinc-100"
                }`}
                  key={`result-${i}-day-${index}`}
                >
                  <ChangeActivityBtn
                    setSelectedActivity={setSelectedActivity}
                    setActivities={setActivities}
                    setResult={setResult}
                    duration={activity.duration}
                    destination={destination ? destination : undefined}
                    activityIndex={index}
                    dayIndex={i}
                    result={result}
                  />
                  <div>
                    <div className="max-w-5xl">
                      <div className="mr-4 text-zinc-700">
                        <ClockIcon className="inline-block w-4 h-4 mb-1 text-zinc-400" />
                        {activity.duration}
                      </div>
                      <div className="font-semibold tracking-tight text-amber-400 capitalize text-lg">
                        {activity["activity name"].toLowerCase()}
                      </div>
                    </div>
                    <ExactLocation address={activity.address} />
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ActivityComponent;
