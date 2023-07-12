import Card from "./Card";

const PlanCard = ({ plan }: any) => {
  return (
    <Card>
      <h3 className="text-center">{plan.destination}</h3>
      <h3 className="text-center">Duration: {plan.duration} days.</h3>
    </Card>
  );
};

export default PlanCard;
