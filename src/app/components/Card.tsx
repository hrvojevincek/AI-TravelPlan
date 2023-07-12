interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`p-4 border-2 rounded-xl shadow w-fit ${className}`}>
      {children}
    </div>
  );
};

export default Card;
