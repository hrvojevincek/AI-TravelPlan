import { Search } from "@/types";
import Card from "./Card";

type PlanCardProps = {
  plan: Search;
};
const PlanCard = ({ plan }: PlanCardProps) => {
  return (
    <Card
      backgroundImage={plan.image}
      className="p-4 flex flex-col justify-end h-full text-xl font-bold tracking-tighter capitalize drop-shadow-sm"
    >
      <p className="text-3xl">{plan.destination}</p>
      <p>{plan.duration} days.</p>
      <p>
        {plan.preferences.map((p, i) => (
          <span
            key={i}
            className="inline-block text-sm tracking-normal font-thin px-2 py-1 bg-slate-900 rounded-sm mr-2 bg-opacity-60 backdrop-blur-md"
          >
            {p.replace(", ", "")}
          </span>
        ))}
      </p>
    </Card>
  );
};

export default PlanCard;
