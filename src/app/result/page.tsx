"use client";

import { Activity, ResultData } from "@/types";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DetailsCard from "../components/DetailsCard";
import Map from "../components/Map";
import SavePlanModal from "../components/SavePlanModal";
import LoadingPage from "../loading";

import { fetchSearchResultsGPT, savePlan } from "@/utils/api";
import { useJsApiLoader } from "@react-google-maps/api";
import ActivityComponent from "../components/ActivityComponent";
import ErrorPage from "../components/ErrorPage";

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
    const responseData = await fetchSearchResultsGPT(destination, duration);

    // const parsedData = JSON.parse(responseData);

    console.log("RESPONSE DATA CLIENT", typeof responseData);

    setResult(responseData);
    setActivities(responseData.flatMap((day) => day));
    setLoading(false);
  }

  if (loading || !isMapLoading) {
    return <LoadingPage />;
  }

  if (error || !result || result.length === 0) {
    return (
      <ErrorPage message={error || "No results found. Please try again."} />
    );
  }

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
