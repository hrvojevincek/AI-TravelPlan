import { usePopupCenter } from "@/lib/hooks/useAuthPopup";
import { ArrowDownTrayIcon } from "@heroicons/react/20/solid";
import { useSession } from "next-auth/react";

function SavePlanButton({
  handleSave,
}: {
  handleSave: (hasBeenChecked: boolean) => void;
}) {
  const popupCenter = usePopupCenter();
  const { data: session } = useSession();

  const callback = session?.user
    ? () => handleSave(true)
    : () => popupCenter("/signin", "Sign In");
  return (
    <div className="flex items-center">
      <button
        onClick={callback}
        className="bg-yellow-500 text-white rounded-full p-1 px-6 shadow-md flex items-center"
      >
        <ArrowDownTrayIcon className="inline-block w-4 h-4 mr-1 mb-1" />
        <div>Save</div>
      </button>
    </div>
  );
}

export default SavePlanButton;
