import { FC } from "react";
import { FilterButtonProps } from "./FilterButton.types";

export const FilterButton: FC<FilterButtonProps> = ({
  label,
  isSelected,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex-1 px-2 py-1.5 text-xs rounded border transition-colors h-full ${
        isSelected
          ? "bg-primary-100 border-primary-100 text-primary-600 font-medium"
          : "bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300"
      }`}
    >
      {label}
    </button>
  );
};
