import React from "react";

export default function SavePlanModal({
  isModalOpen,
  setIsModalOpen,
  destination,
  duration,
  handleSave,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (boolean: boolean) => void;
  destination: string;
  duration: string;
  handleSave: (hasBeenChecked: boolean, update: boolean) => void;
}) {
  return (
    <>
      {isModalOpen && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Existing Plan Found!
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-9 float-right text-2xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setIsModalOpen(false)}
                  >
                    x
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    You already have an existing plan in {destination} for{" "}
                    {duration} days. <br />
                    Do you want to update the existing plan or create a new one?
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      handleSave(true, true);
                      setIsModalOpen(false);
                    }}
                  >
                    Update Plan
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      handleSave(true, false);
                      setIsModalOpen(false);
                    }}
                  >
                    Create New Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}
