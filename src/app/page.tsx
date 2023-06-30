"use client";

import { ResultData, SearchData } from "@/types";
import { useEffect, useState } from "react";
import { useDataContext } from "./dataContext";
// import { useRouter } from 'next/router';
import Link from "next/link";
// import VideoPlayer from "./components/VideoPlayer";
import { default as Video } from "./components/Video";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { setData } = useDataContext();
  // const videos = ["video1.mp4", "video2.mp4", "video3.mp4"];
  // const [video, setVideo] = useState(0);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setVideo((prev) => (prev + 1) % videos.length);
  //   }, 3000);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [video, videos.length]);

  // const currVideo = videos[video];
  // const videoSrc = `/videos/${currVideo}`;
  // const router = useRouter()

  return (
    <>
      {/* <Video /> */}
      <Video />
      {/* <VideoPlayer src={videoSrc} /> */}
      <div className="flex flex-col md:flex-row top-0 absolute h-screen w-screen">
        <div className="h-screen flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <h2 className="mt-3 mb-10 text-center text-5xl font-bold leading-9 tracking-tight text-white">
            Welcome to Travel Plan
          </h2>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-3"
              action="#"
              method="POST"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div>
                <label
                  htmlFor=""
                  className="block text-md font-bold leading-5 text-white"
                >
                  ENTER YOUR DESTINATION
                </label>
                <div className="mt-3">
                  <input
                    onChange={(e) => {
                      setData((prev: SearchData | null) => {
                        return { ...prev, destination: e.target.value };
                      });
                    }}
                    id="destination"
                    name="destination"
                    type="text"
                    required
                    placeholder="Barcelona"
                    className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-3 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor=""
                    className="block text-md font-bold leading-6 text-white"
                  >
                    AND DURATION
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    onChange={(e) => {
                      setData((prev: SearchData | null) => {
                        return { ...prev, duration: e.target.value };
                      });
                    }}
                    id="duration"
                    name="duration"
                    type="text"
                    placeholder="3-day trip"
                    required
                    className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <Link href="/result">
                  <button
                    // href="/result"
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300"
                  >
                    Plan my trip :)
                  </button>
                </Link>
              </div>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
              Not a member?{" "}
              <a
                href="#"
                className="font-semibold leading-6 text-indigo- hover:text-indigo-500"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
