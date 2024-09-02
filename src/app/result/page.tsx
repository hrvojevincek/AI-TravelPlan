"use client";

import { Activity, ResultData } from "@/types";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DetailsCard from "../components/DetailsCard";
import Map from "../components/Map";
import SavePlanModal from "../components/SavePlanModal";
import LoadingPage from "../loading";

import { fetchSearchResults, savePlan } from "@/utils/api";
import { useJsApiLoader } from "@react-google-maps/api";
import ActivityComponent from "../components/ActivityComponent";

function ResultsPage() {
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResultData>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { data: session } = useSession();

  const searchParams = useSearchParams();
  const { destination, duration, preferences, searchId } = Object.fromEntries(
    searchParams.entries()
  );

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
    const responseData = await fetchSearchResults(
      destination,
      duration,
      preferences,
      searchId
    );
    console.log("RESPONSE DATA", responseData);
    console.log(
      "RESPONSE kao activities DATA",
      responseData.flatMap((day) => day)
    );
    setResult(responseData);
    setActivities(responseData.flatMap((day) => day));
    setLoading(false);
  }

  if (loading || !isMapLoading) {
    return <LoadingPage />;
  }

  // if (error || !result || result.length === 0) {
  //   return (
  //     <ErrorPage message={error || "No results found. Please try again."} />
  //   );
  // }

  async function handleSave(hasBeenChecked: boolean, update = false) {
    if (searchId !== null && isModalOpen === false) {
      setIsModalOpen(true);
      return;
    }
    try {
      const saved = await savePlan(
        session?.user?.email ?? undefined,
        result,
        hasBeenChecked,
        update,
        preferences?.split(", ") || [],
        destination,
        duration,
        searchId
      );
      if (saved.status === 200) {
        alert(saved.message);
      }
      if (saved.status === 201) {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error saving plan:", error);
      alert("Error saving plan. Please try again.");
    }
  }

  return (
    <div className="flex h-screen w-screen">
      {/* <div
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
      </div> */}
      <ActivityComponent
        duration={duration}
        destination={destination}
        result={result}
        setSelectedActivity={setSelectedActivity}
        selectedActivity={selectedActivity}
        setActivities={setActivities}
        setResult={setResult}
        onHandleSelectedActivity={onHandleSelectedActivity}
        handleSave={() => handleSave(false)}
      />
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
