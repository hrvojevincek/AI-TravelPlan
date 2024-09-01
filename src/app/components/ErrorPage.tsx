import React from "react";

function ErrorPage({ message }: { message: string }) {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Error</h1>
        <p className="text-lg">{message}</p>
      </div>
    </div>
  );
}

export default ErrorPage;
