import { useEffect } from 'react';

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
  async function activity(duration: string, activityName: string) {
    const result = await fetch(
      `/api/activity?duration=${duration}&activityName=${activityName}`,
      { headers: { 'Content-Type': 'application/json' } }
    );
    const responseData = await result.json();
    console.log(responseData);
  }

  const handleButtonClick = (
    duration: string,
    activityName: string,
    index: number
  ) => {
    activity(duration, activityName);
    console.log('BUTTON CLICKED', duration, activityName, index);
  };

  return (
    <button
      className="text-white bg-gray-300 font-bold py-2 px-4 rounded"
      onClick={handleButtonClick}
    >
      Change me activity!
    </button>
  );
};

export default ChangeMeBtn;
