import Link from "next/link";
import React from "react";

function DetailsCard({ cardInfo }: { cardInfo: any }) {
  {
    console.log(cardInfo);
  }

  return (
    <div className="z-10 absolute bottom-10 right-10">
      <Link
        href={cardInfo?.result ? cardInfo.result.url : ""}
        target="_blank"
        className="flex flex-col items-center bg-white border border-gray-100 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <img
          className=" m-3 object-cover w-full rounded-lg h-96 md:h-auto md:w-48"
          alt=""
          src={
            cardInfo.result?.photos
              ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${
                  cardInfo.result.photos[0].photo_reference
                }&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}`
              : ""
          }
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {cardInfo?.id}
          </h5>
          <p className="mb-3 font-normal text-gray-100 dark:text-gray-400">
            {cardInfo
              ? cardInfo?.result?.editorial_summary?.overview
              : "NO INFO SORRY"}
            {cardInfo ? cardInfo?.result?.rating : "NO INFO SORRY"}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default DetailsCard;
