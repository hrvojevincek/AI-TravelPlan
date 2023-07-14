import Link from "next/link";
import { useSession } from "next-auth/react";
import { ArrowDownTrayIcon } from "@heroicons/react/20/solid";
import { usePopupCenter } from "@/lib/hooks/useAuthPopup";

function SavePlanButton({
  handleSave,
}: {
  handleSave: (hasBeenChecked: boolean) => void;
}) {
  const popupCenter = usePopupCenter();
  const { data: session } = useSession();

  const callback = session?.user
    ? () => handleSave(true)
    : () => popupCenter("/google-signin", "Sample Sign In");
  return (
    <button
      onClick={callback}
      className="bg-yellow-500 text-white rounded-full p-1 px-6 shadow-md"
    >
      <ArrowDownTrayIcon className="inline-block w-4 h-4 mr-1 mb-1" />
      Save
    </button>
  );
}

export default SavePlanButton;
