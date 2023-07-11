"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useDataContext } from "../dataContext";

const LoadingImage = () => {
  const images = [
    "/images/beach.jpg",
    "/images/paris.jpg",
    "/images/balloons.jpg",
    "/images/chicago.jpg",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { data } = useDataContext();
  const capitalisedDestination =
    data?.destination.charAt(0).toUpperCase() +
    data?.destination.slice(1).toLowerCase();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <Image
        src={images[currentImageIndex]}
        layout="fill"
        objectFit="cover"
        alt="image"
        priority
      />
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="bg-gray-700 bg-opacity-75 p-4 rounded-full">
          <h1 className="text-yellow-400">
            Planning your {data?.duration} day trip to {capitalisedDestination}
            ...
          </h1>
        </div>
      </div>
    </div>
  );
};

export default LoadingImage;
