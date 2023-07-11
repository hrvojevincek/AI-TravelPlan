import Link from "next/link";
import { useSession } from "next-auth/react";

function SavePlanButton({
  handleSave,
}: {
  handleSave: (hasBeenChecked: boolean) => void;
}) {
  const { data: session } = useSession();
  return (
    <>
      {session?.user ? (
        <button
          onClick={() => handleSave(false)}
          className="flex p-2 w-fit rounded-xl bg-yellow-400 text-white gap-2"
        >
          Save{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
        </button>
      ) : (
        <Link href="/api/auth/signin">
          <button className="flex p-2 w-fit rounded-xl bg-yellow-400 text-white gap-2">
            Save{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
          </button>
        </Link>
      )}
    </>
  );
}

export default SavePlanButton;
