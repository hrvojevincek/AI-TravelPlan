import LoadingImage from "../components/LoadingImage";

export default function Loading({
  destination,
  duration,
}: {
  destination: string;
  duration: string;
}) {
  // You can use default values here, or pass empty strings
  return <LoadingImage destination={destination} duration={duration} />;
}
