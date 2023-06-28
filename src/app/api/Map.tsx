import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api'
import type { Activity } from '@/types'
import { geocodeAddress } from '../geocode'
import { useState, useEffect, useRef, useCallback } from 'react'

const containerStyle = {
  width: '100%',
  height: '400px',
}

const Map = ({ activities }: { activities: Activity[] }) => {
  const [center] = useState({
    lat: 0, // Latitud del centro del mapa
    lng: 0, // Longitud del centro del mapa
  })

  const mapRef = useRef<google.maps.Map>()

  const hanldeMapLoad = useCallback((mapInstance: google.maps.Map) => {
    mapRef.current = mapInstance
  }, [])

  const [activityMarkers, setActivityMarkers] = useState<
    { id: string; lat: number; lng: number }[]
  >([])

  useEffect(() => {
    const fetchActivityMarkers = async () => {
      const markers: { id: string; lat: number; lng: number }[] = []
      for (const activity of activities) {
        try {
          const { lat, lng } = await geocodeAddress(activity.address)
          markers.push({ id: activity['activity name'], lat, lng })
        } catch (error) {
          console.error('Error geocoding address:', error)
        }
      }

      setActivityMarkers(markers)

      const bounds = new window.google.maps.LatLngBounds()
      markers.forEach((marker) => {
        bounds.extend(new window.google.maps.LatLng(marker.lat, marker.lng))
      })
      const mapInstance = mapRef.current
      if (mapInstance && markers.length > 0) {
        mapInstance.fitBounds(bounds)
      }
    }
    fetchActivityMarkers()
  }, [activities])

  //   const googleMapsApiKey = 'AIzaSyCCB6Ygzq1qrFozt9fOzQ-GjUBz6C_f9nk'

  return (
    <LoadScript googleMapsApiKey="AIzaSyCCB6Ygzq1qrFozt9fOzQ-GjUBz6C_f9nk">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
        onLoad={hanldeMapLoad}
      >
        {activityMarkers.map((marker) => {
          return (
            <Marker
              key={`marker-${marker.id}`}
              position={{
                lat: marker.lat,
                lng: marker.lng,
              }}
            />
          )
        })}
      </GoogleMap>
    </LoadScript>
  )
}

export default Map
