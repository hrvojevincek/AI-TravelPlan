import Link from "next/link";
import { useEffect, useState } from "react";

export type ExactLocationProps = {
  address: string;
} & React.HTMLAttributes<HTMLDivElement>;

const ExactLocation = ({ address, ...props }: ExactLocationProps) => {
  const [googleMapsLink, setGoogleMapsLink] = useState("");

  useEffect(() => {
    if (address) {
      const link = generateGoogleMapsLink(address);
      setGoogleMapsLink(link);
    }
  }, [address]);

  const generateGoogleMapsLink = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  };

  return (
    <div role="button" className="text-black" {...props}>
      {/* <Link href={googleMapsLink} target="_blank"> */}
      {address}
      {/* </Link> */}
    </div>
  );
};

export default ExactLocation;
