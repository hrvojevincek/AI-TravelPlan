import React from "react";
import Link from "next/link";

function ErrorPage({ message }: { message: string }) {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4 text-red-600">Error</h1>
        <p className="text-lg mb-6">
          An error occurred while fetching data from the OpenAI API. Please try
          again.
        </p>
        <p>{message}</p>
        <Link
          href="/"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
