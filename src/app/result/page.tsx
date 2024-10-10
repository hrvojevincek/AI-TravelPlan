"use client";

import { Activity, ResultData } from "@/types";
import { fetchSearchResultsGPT, savePlan } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ActivityComponent from "../components/ActivityComponent";
import DetailsCard from "../components/DetailsCard";
import ErrorPage from "../components/ErrorPage";
import Map from "../components/Map";
import SavePlanModal from "../components/SavePlanModal";
import LoadingImage from "../components/LoadingImage";
import { useJsApiLoader } from "@react-google-maps/api";
import Link from "next/link";

function ResultsPage() {
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResultData>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { data: session } = useSession();
  const router = useRouter();

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
    setLoading(true);
    try {
      const responseData = await fetchSearchResultsGPT(destination, duration);
      setResult(responseData);
      setActivities(responseData.flatMap((day) => day));
    } catch (error) {
      setError(
        "An error occurred while fetching results. Please ensure you've entered a valid city name."
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <LoadingImage destination={destination} duration={duration} />;
  }

  if (error || !result || result.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Error</h2>
          <p className="mb-6">
            {error ||
              "No results found. Please ensure you've entered a valid city name."}
          </p>
          <Link href="/" className="text-black font-bold py-2 px-4 rounded">
            Return to Homepage
          </Link>
        </div>
      </div>
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
    <div className="flex flex-col h-screen w-screen sm:flex-row">
      <div className="h-1/2 sm:h-screen sm:w-1/3 overflow-y-auto mb-4 sm:mb-0">
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
      </div>
      <div className="h-1/2 sm:h-screen sm:w-2/3 flex flex-col">
        {selectedActivity && (
          <DetailsCard
            cardInfo={selectedCardInfo}
            selectedActivity={selectedActivity}
          />
        )}

        {result.length > 0 ? (
          <div className="flex-grow">
            <Map
              setCardsInfo={setCardsInfo}
              destination={destination!}
              activities={activities}
              selectedActivity={selectedActivity}
              handleSelectActivity={onHandleSelectedActivity}
            />
          </div>
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
