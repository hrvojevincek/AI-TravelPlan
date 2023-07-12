"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useDataContext } from "../dataContext";

const LoadingImage = () => {
  const images = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
    "https://images.unsplash.com/photo-1526821799652-2dc51675628e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3056&q=80",
    "https://images.unsplash.com/photo-1549740425-5e9ed4d8cd34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2144&q=80",
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
