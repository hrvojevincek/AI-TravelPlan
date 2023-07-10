import {
  GoogleMap,
  Marker,
  LoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import type { Activity } from "@/types";
import { geocodeAddress } from "../geocode";
import { useState, useEffect, useRef, useCallback } from "react";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

type MapProps = {
  activities: Activity[];
  selectedActivity?: Activity;
};

const Map = ({ activities, selectedActivity }: MapProps) => {
  const [center, setCenter] = useState({
    lat: 0, // Latitud del centro del mapa
    lng: 0, // Longitud del centro del mapa
  });

  const mapRef = useRef<google.maps.Map>();

  const hanldeMapLoad = useCallback((mapInstance: google.maps.Map) => {
    mapRef.current = mapInstance;
  }, []);
  type Marker = { id: string; lat: number; lng: number };

  const [activityMarkers, setActivityMarkers] = useState<Marker[]>([]);

  const [selectedMarker, setSelectedMarker] = useState<Marker>();

  useEffect(() => {
    const fetchActivityMarkers = async () => {
      const markers: {
        id: string;
        lat: number;
        lng: number;
        icon: { url: string };
      }[] = [];
      for (const activity of activities) {
        try {
          const { lat, lng } = await geocodeAddress(activity.address);
          markers.push({
            id: activity["activity name"],
            lat,
            lng,
            icon: {
              url: `http://maps.google.com/mapfiles/ms/icons/red-dot.png`,
            },
          });
        } catch (error) {
          console.error("Error geocoding address:", error);
        }
      }

      setActivityMarkers(markers);

      const bounds = new window.google.maps.LatLngBounds();
      markers.forEach((marker) => {
        bounds.extend(new window.google.maps.LatLng(marker.lat, marker.lng));
      });
      const mapInstance = mapRef.current;
      if (mapInstance && markers.length > 0) {
        mapInstance.fitBounds(bounds);
      }
    };
    fetchActivityMarkers();
    console.log("FETCHING ACTIVITY MARKERS");
  }, [activities]);

  useEffect(() => {
    if (!selectedActivity) return;

    const marker = activityMarkers.find(
      (marker) => marker.id === selectedActivity["activity name"]
    );
    if (!marker) return;
    setSelectedMarker(marker);
    setCenter({
      lat: marker.lat,
      lng: marker.lng,
    });
    setActivityMarkers((markers) =>
      markers.map((m) => {
        if (m.id === marker.id) {
          return {
            ...m,
            icon: {
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            },
          };
        } else {
          return {
            ...m,
            icon: {
              url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
            },
          };
        }
      })
    );
  }, [selectedActivity]);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
        onLoad={hanldeMapLoad}
      >
        {activityMarkers.map((marker: any) => {
          return (
            <Marker
              key={`marker-${marker.id}`}
              position={{
                lat: marker.lat,
                lng: marker.lng,
              }}
              onClick={() => {
                setSelectedMarker(marker);
              }}
              icon={marker.icon}
            />
          );
        })}
        {selectedMarker && (
          <InfoWindow
            options={{
              pixelOffset: new window.google.maps.Size(0, -40),
            }}
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => {
              setSelectedMarker(undefined);
            }}
          >
            <div>
              <h2>{selectedMarker.id}</h2>
              <p>This is extra information about this location.</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
