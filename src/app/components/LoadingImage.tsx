"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const LoadingImage = () => {
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination");
  const duration = searchParams.get("duration");
  const images = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
    "https://images.unsplash.com/photo-1526821799652-2dc51675628e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3056&q=80",
    "https://images.unsplash.com/photo-1549740425-5e9ed4d8cd34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2144&q=80",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const capitalisedDestination = ((destination
    ?.charAt(0)
    .toUpperCase() as string) + destination?.slice(1).toLowerCase()) as string;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center relative h-screen">
      <Image src={images[currentImageIndex]} fill={true} alt="image" priority />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute bg-gray-700 bg-opacity-75 rounded-full w-100 h-100"></div>
        <div className="flex flex-col align-center items-center z-10">
          <h1 className="font-bold  text-center text-5xl mb-10 text-yellow-400">
            Planning your <br />
            {duration} day
            <br />
            trip to <br />
            {capitalisedDestination}
            ...
          </h1>
        </div>
      </div>
    </div>
  );
};

export default LoadingImage;
