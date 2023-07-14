import Link, { LinkProps } from "next/link";

type ButtonLinkProps = LinkProps & {
  className?: string;
  children: React.ReactNode;
};

export const ButtonLink = ({
  className,
  children,
  ...props
}: ButtonLinkProps) => {
  return (
    <Link
      className={`bg-slate-900 text-white rounded-full p-1 px-6 shadow-md ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};
