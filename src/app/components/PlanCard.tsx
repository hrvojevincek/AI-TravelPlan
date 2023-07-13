import { Search } from "@/types";
import Card from "./Card";

type PlanCardProps = {
  plan: Search;
};
const PlanCard = ({ plan }: PlanCardProps) => {
  return (
    <Card
      backgroundImage={plan.image}
      className="p-4 flex flex-col justify-end h-full text-3xl font-bold tracking-tighter"
    >
      <p>{plan.destination}</p>
      <p>{plan.duration} days.</p>
    </Card>
  );
};

export default PlanCard;
