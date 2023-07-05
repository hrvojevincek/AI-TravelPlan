import client from "../api/GPTClient";

interface ChangeMeProps {
  duration: string;
  activityName: string;
  index: number;
}

const ChangeMeBtn: React.FC<ChangeMeProps> = ({
  duration,
  activityName,
  index,
}) => {
  const handleButtonClick = (
    duration: string,
    activityName: string,
    index: number
  ) => {
    console.log(duration, activityName, index);
  };

  return (
    <button
      className="text-white bg-gray-300 font-bold py-2 px-4 rounded"
      onClick={() => handleButtonClick(duration, activityName, index)}
    >
      Click Me
    </button>
  );
};

export default ChangeMeBtn;
