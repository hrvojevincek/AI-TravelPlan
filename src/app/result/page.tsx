"use client";

import { useEffect, useState } from "react";
import { ResultData, Activity } from "@/types";
import Map from "../components/Map";
import ExactLocation from "../components/ExactLocation";
import ChangeMeBtn from "../components/ChangeMeBtn";
import LoadingPage from "../loading";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import SavePlanButton from "../components/SavePlanButton";
import SavePlanModal from "../components/SavePlanModal";
import getPlaceId from "@/utils/getPlaceId";
import DetailsCard from "../components/DetailsCard";

import logo from "../../../public/logo.svg";
import Image from "next/image";
import { ButtonLink } from "../components/ButtonLink";
import { ClockIcon } from "@heroicons/react/24/outline";
import { useJsApiLoader } from "@react-google-maps/api";
import Link from "next/link";

function ResultsPage() {
  const [result, setResult] = useState<ResultData>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination");
  const duration = searchParams.get("duration");
  const preferences = searchParams.get("preferences");
  const searchId = searchParams.get("searchId");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<string>("");
  const [cardsInfo, setCardsInfo] = useState([]);
  const [selectedCardInfo, setSelectedCardInfo] = useState({});
  const onHandleSelectedActivity = (id: string) => {
    setSelectedActivity(id);
    const cardInfo = cardsInfo.find((el: any) => el.id === id);
    setSelectedCardInfo(cardInfo!);
  };

  const { isLoaded: isMapLoading } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  useEffect(() => {
    search();
  }, []);

  async function search() {
    const url =
      searchId === null
        ? `/api/search?destination=${destination}&duration=${duration}${
            preferences ? `&preferences=${preferences}` : ""
          }`
        : `/api/search?searchId=${searchId}`;
    const result = await fetch(url, {
      headers: { "Content-Type": "application/json" },
    });
    const responseData = (await result.json()) as ResultData;
    setResult(responseData);
    setLoading(false);
    setActivities(responseData.flat());
  }

  if (loading || !isMapLoading) {
    return <LoadingPage />;
  }

  async function handleSave(hasBeenChecked: boolean, update = false) {
    if (searchId !== null && isModalOpen === false) {
      setIsModalOpen(true);
      return;
    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      email: session?.user?.email,
      response: result,
      hasBeenChecked,
      update,
      preferences: preferences?.split(", ") || [],
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
    const isSaved = await fetch(
      `/api/search?destination=${destination}&duration=${duration}&searchId=${searchId}`,
      requestOptions
    );
    const saved = await isSaved.json();
    if (isSaved.status === 200) {
      alert(saved.message);
    }
    if (isSaved.status === 201) {
      setIsModalOpen(true);
    }
  }

  return (
    <div className="flex h-screen w-screen">
      <div
        className="relative overflow-auto p-6 bg-white shadow-md z-10"
        onClick={() => {
          setSelectedActivity("");
        }}
      >
        <div className="flex justify-between w-full mb-10 ">
          <Link href="/">
            <Image src={logo} alt="Best company ever"></Image>
          </Link>
          <div>
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
                    className={`flex justify-stretch border-2  p-4 rounded-md mb-4 max-w-sm cursor-pointer 
                    ${
                      activity["activity name"] === selectedActivity
                        ? "border-zinc-700"
                        : "border-zinc-100"
                    }`}
                    key={`result-${i}-day-${index}`}
                  >
                    <ChangeMeBtn
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
      <div className=" flex-grow">
        {selectedActivity && (
          <DetailsCard
            cardInfo={selectedCardInfo}
            selectedActivity={selectedActivity}
          />
        )}

        {result.length > 0 ? (
          //pass event
          <Map
            setCardsInfo={setCardsInfo}
            destination={destination!}
            activities={activities}
            selectedActivity={selectedActivity}
            handleSelectActivity={onHandleSelectedActivity}
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
