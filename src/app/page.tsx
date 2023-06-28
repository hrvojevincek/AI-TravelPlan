'use client'

import { ResultData, SearchData } from '@/types'
import { useState } from 'react'
import ExactLocation from './api/ExactLocation'
import Map from './api/Map'
import mock from './api/mock.json'

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState<SearchData>({})
  const [result, setResult] = useState<ResultData>([])

  const search = async () => {
    const result = await fetch('http://localhost:3000/api')

    const data = await result.json()

    setResult(data)
  }
  return (
    <div className="flex flex-col md:flex-row">
      {result.length > 0 ? (
        <>
          <div className="max-w-2xl p-6 bg-white border border-gray-200 shadow mb-2 rounded-xl">
            {result.map((data, i) => {
              return (
                <div
                  key={`result-${i}`}
                  className="divide-y max-w-2xl p-6 bg-white border border-gray-200 shadow mb-2 rounded-xl"
                >
                  <h1 className="font-bold text-xl">Day {i + 1}</h1>
                  {data.map((activity, index) => {
                    return (
                      <div key={`result-${i}-day-${index}`}>
                        <div>{activity['activity name']}</div>
                        <div>{activity.duration}</div>
                        {/* <div>{activity.address}</div> */}
                        <ExactLocation address={activity.address} />
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
          <div className="flex-grow">
            <Map
              activities={mock.reduce((acc, day) => {
                return [...acc, ...day]
              }, [])}
            />
          </div>
        </>
      ) : (
        <div className="bg-cover h-screen bg-[url(https://www.gannett-cdn.com/presto/2022/01/27/USAT/48e9bfdf-d556-436b-b04a-94bbb350cae9-GettyImages-482612302.jpg?crop=2886%2C1624%2Cx0%2Cy247&width=1200)] flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <h2 className="mt-3 mb-10 text-center text-5xl font-bold leading-9 tracking-tight text-white">
            Welcome to Travel Plan
          </h2>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              onSubmit={search}
              className="space-y-3"
              action="#"
              method="POST"
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
                      setData((prev: SearchData) => {
                        return { ...prev, destination: e.target.value }
                      })
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
                      setData((prev: SearchData) => {
                        return { ...prev, duration: e.target.value }
                      })
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
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300"
                >
                  Plan my trip :)
                </button>
              </div>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
              Not a member?{' '}
              <a
                href="#"
                className="font-semibold leading-6 text-indigo- hover:text-indigo-500"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
