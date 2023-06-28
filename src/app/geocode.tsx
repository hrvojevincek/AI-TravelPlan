export const geocodeAddress = async (
  address: string
): Promise<{ lat: number; lng: number }> => {
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=AIzaSyCCB6Ygzq1qrFozt9fOzQ-GjUBz6C_f9nk`

  const res = await fetch(apiUrl)
  const data = await res.json()

  if (data.status === 'OK' && data.results.length > 0) {
    const result = data.results[0]
    const { lat, lng } = result.geometry.location
    return { lat, lng }
  } else {
    throw new Error('Error!')
  }
}
