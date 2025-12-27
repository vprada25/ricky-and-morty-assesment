import { FC } from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "alive" | "dead" | "unknown" | "default";
}

export const Badge: FC<BadgeProps> = ({ children, variant = "default" }) => {
  const variants = {
    alive: "bg-green-100 text-green-700 border border-green-200",
    dead: "bg-red-100 text-red-700 border border-red-200",
    unknown: "bg-gray-100 text-gray-700 border border-gray-200",
    default: "bg-blue-100 text-blue-700 border border-blue-200",
  };

  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
};
