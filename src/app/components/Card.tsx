interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`p-4 rounded-xl bg-white shadow w-72 h-52 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
