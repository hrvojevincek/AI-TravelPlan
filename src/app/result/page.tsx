'use client';

import { use, useEffect, useState } from 'react';
import { useDataContext } from '../dataContext';
import { ResultData } from '@/types';
import Map from '../api/Map';
import ExactLocation from '../api/ExactLocation';
import mock from '../api/mock.json';

function ResultsPage() {
  const { data } = useDataContext();

  const [result, setResult] = useState<ResultData>([]);

  const search = async () => {
    const result = await fetch('http://localhost:3000/api');

    const data = await result.json();

    setResult(data);
  };

  useEffect(() => {
    search();
  }, []);

  return (
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
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="flex-grow">
        <Map
          activities={mock.reduce((acc, day) => {
            return [...acc, ...day];
          }, [])}
        />
      </div>
    </>
  );
}

export default ResultsPage;
