import {
  PhotoIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type DetailProp = {
  selectedActivity: string;
  cardInfo: any;
};

const DetailsCard: React.FC<DetailProp> = ({ cardInfo, selectedActivity }) => {
  const openGoogleMaps = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const url = cardInfo?.result?.url || "";
    window.open(
      url,
      "GoogleMaps",
      "width=750,height=750,resizable=yes,scrollbars=yes"
    );
  };

  return (
    <div className="z-10 absolute right-20 bottom-20">
      <Link
        href={cardInfo?.result ? cardInfo.result.url : ""}
        target="_blank"
        onClick={openGoogleMaps}
        className="flex border rounded-lg shadow items-start max-w-xl bg-zinc-50 p-2 relative"
      >
        {renderImage(cardInfo)}
        <div className="flex flex-col justify-between p-2 leading-normal">
          <h5 className="text-2xl font-bold tracking-tight text-black">
            {selectedActivity}
          </h5>
          {renderDescription(cardInfo)}
          <div className="absolute bottom-2 right-4">
            <Link
              href={cardInfo?.result ? cardInfo.result.url : ""}
              target="_blank"
              className="flex items-center text-xs text-slate-400 hover:text-yellow-500 transition-colors duration-200"
            >
              <span className="mr-1">Open in Google Maps</span>
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
};

const renderImage = (cardInfo: any) => {
  if (cardInfo && cardInfo.result && cardInfo.result.photos) {
    return (
      <Image
        className="m-2 object-cover rounded-lg md:h-auto md:w-48"
        alt=""
        width={150}
        height={150}
        quality={100}
        src={
          cardInfo.result.photos
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${
                cardInfo.result.photos[0].photo_reference
              }&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}`
            : ""
        }
      />
    );
  }

  return (
    <div className="w-32 bg-slate-300 aspect-square flex justify-center items-center rounded-md">
      <PhotoIcon className="w-8 h-8 text-slate-400" />
    </div>
  );
};

const renderDescription = (cardInfo: any) => {
  if (cardInfo?.result?.editorial_summary?.overview) {
    return (
      <p className="mb-3 font-normal text-black">
        {cardInfo?.result?.editorial_summary?.overview}
        {cardInfo?.result?.rating}
      </p>
    );
  }

  return (
    <p className="text-slate-400 text-sm">
      Sorry, no description available. But hey, it's a great opportunity to
      start exploring by yourself!
    </p>
  );
};

export default DetailsCard;
