import Image from "next/image";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  backgroundImage?: string;
}

const Card: React.FC<CardProps> = ({
  backgroundImage,
  children,
  className,
  ...props
}) => {
  return (
    <div className={`rounded-xl bg-white shadow w-72 h-52 relative`}>
      {backgroundImage && (
        <>
          <div className="absolute w-full h-full ">
            <Image
              className="object-cover t-0 l-0 w-full h-full rounded-xl"
              src={backgroundImage}
              alt="background"
              fill
            />
          </div>
          <div className="absolute w-full h-full rounded-xl bg-black opacity-20"></div>
        </>
      )}{" "}
      {/** Background */}
      <div
        className={`relative ${backgroundImage && "text-white"} ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
