import type { Activity } from "@/types";
import getPlaceId from "@/utils/getPlaceId";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { useCallback, useEffect, useRef, useState } from "react";

const library = "places";

const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "100vh",
};

type MapProps = {
  setCardsInfo: (cardInfo: any) => void;
  activities: Activity[];
  selectedActivity?: string;
  handleSelectActivity: (id: string) => void;
  destination?: string;
};

type MarkerDataType = {
  id: string;
  lat: number;
  lng: number;
  icon?: { url: string; size: google.maps.Size };
};

const Map: React.FC<MapProps> = ({
  setCardsInfo,
  activities,
  selectedActivity,
  handleSelectActivity,
  destination,
}) => {
  const [center, setCenter] = useState({
    lat: 0, // Lat map center
    lng: 0, // Long map center
  });

  const mapRef = useRef<google.maps.Map>();

  const handleMapLoad = useCallback((mapInstance: google.maps.Map) => {
    mapRef.current = mapInstance;
  }, []);

  const [activityMarkers, setActivityMarkers] = useState<MarkerDataType[]>([]);

  const [selectedMarker, setSelectedMarker] = useState<MarkerDataType>();

  useEffect(() => {
    const fetchActivityMarkers = async () => {
      const markerIcon = {
        url: "/maps/pin@2x.png",
        size: new google.maps.Size(76, 76),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(38, 38),
        scaledSize: new google.maps.Size(38, 38),
      };
      let markers: MarkerDataType[] = [];
      try {
        const information = await getPlaceId(activities, destination);
        markers = information.map((info: any) => {
          setCardsInfo((prev: any) => [
            ...prev,
            { ...info.editorial, id: info.activityName },
          ]);
          return {
            id: info.activityName,
            lat: info.lat,
            lng: info.lng,
            icon: markerIcon,
          };
        });
      } catch (error) {
        console.error("Error geocoding address:", error);
      }

      setActivityMarkers(markers);

      const bounds = new window.google.maps.LatLngBounds();
      markers.forEach((marker) => {
        bounds.extend(new window.google.maps.LatLng(marker.lat, marker.lng));
      });
      const mapInstance = mapRef.current;
      if (mapInstance && markers.length > 0) {
        mapInstance.panToBounds(bounds);
        mapInstance.setZoom(5);
        setTimeout(() => mapInstance.fitBounds(bounds), 500);
      }
    };
    fetchActivityMarkers();
  }, [activities]);

  useEffect(() => {
    if (!selectedActivity) {
      setSelectedMarker(undefined);
      return;
    }

    const target = activityMarkers.find(
      (marker) => marker.id === selectedActivity
    );
    if (!target) return;
    setSelectedMarker(target);
    // setCenter({
    //   lat: target.lat,
    //   lng: target.lng,
    // });
    mapRef.current?.panTo({
      lat: target.lat,
      lng: target.lng,
    });
  }, [selectedActivity]);

  useEffect(() => {
    const markerIcon = {
      url: "/maps/pin@2x.png",
      size: new google.maps.Size(76, 76),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(38, 38),
      scaledSize: new google.maps.Size(38, 38),
    };
    const selectedMarkerIcon = {
      url: "/maps/marker@2x.png",
      size: new google.maps.Size(100, 120),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(25, 60),
      scaledSize: new google.maps.Size(50, 60),
    };
    setActivityMarkers((markers) =>
      markers.map((m) => {
        if (selectedMarker && m.id === selectedMarker.id) {
          return {
            ...m,
            icon: selectedMarkerIcon,
          };
        } else {
          return {
            ...m,
            icon: markerIcon,
          };
        }
      })
    );
  }, [selectedMarker]);

  return (
    <GoogleMap
      options={{ mapId: "cac5a755419882c6" }}
      mapContainerClassName="z-1"
      mapContainerStyle={containerStyle}
      center={center}
      zoom={5}
      onLoad={handleMapLoad}
    >
      {activityMarkers.map((marker: MarkerDataType, index) => {
        return (
          <Marker
            key={`marker-${marker.id}${index}`}
            position={{
              lat: marker.lat,
              lng: marker.lng,
            }}
            onClick={() => handleSelectActivity(marker.id)}
            icon={marker.icon}
          />
        );
      })}
    </GoogleMap>
  );
};

export default Map;
