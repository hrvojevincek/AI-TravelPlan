import { PhotoIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React from "react";

type DetailProp = {
  selectedActivity: string;
  cardInfo: any;
};

const DetailsCard: React.FC<DetailProp> = ({ cardInfo, selectedActivity }) => {
  return (
    <div className="z-10 absolute right-20 bottom-20">
      <Link
        href={cardInfo?.result ? cardInfo.result.url : ""}
        target="_blank"
        className="flex flex-col items-center border rounded-lg shadow md:flex-row md:items-start md:max-w-xl  bg-zinc-50 p-4"
      >
        {renderImage(cardInfo)}
        <div className="flex flex-col justify-between p-3 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">
            {selectedActivity}
          </h5>
          {renderDescription(cardInfo)}
        </div>
      </Link>
    </div>
  );
};

const renderImage = (cardInfo: any) => {
  if (cardInfo && cardInfo.result && cardInfo.result.photos) {
    return (
      <img
        className="m-3 object-cover w-full rounded-lg h-96 md:h-auto md:w-48"
        alt=""
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
    <div className="m-3 w-32 bg-slate-300 aspect-square flex justify-center items-center rounded-md">
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
