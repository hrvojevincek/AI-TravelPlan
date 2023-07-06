import React from "react";

interface ChangeMeBtnProps {
  duration: string;
  activityName: string;
  index: number;
}

const ChangeMeBtn: React.FC<ChangeMeBtnProps> = ({
  duration,
  activityName,
  index,
}) => {
  const handleButtonClick = () => {
    console.log(duration, activityName, index);
  };

  return (
    <button
      className="text-white bg-gray-300 font-bold py-2 px-4 rounded"
      onClick={handleButtonClick}
    >
      Click Me
    </button>
  );
};

export default ChangeMeBtn;
