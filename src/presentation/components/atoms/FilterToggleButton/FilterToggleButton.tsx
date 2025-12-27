import { FC } from "react";
import { FilterToggleButtonProps } from "./FilterToggleButton.types";

export const FilterToggleButton: FC<FilterToggleButtonProps> = ({
  onClick,
  isActive = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`absolute right-3 top-3 p-1 rounded transition-colors ${
        isActive ? "bg-primary-100 hover:bg-primary-200" : "hover:bg-gray-100"
      }`}
      aria-label="Toggle filters"
    >
      <svg
        className={`w-4 h-4 ${
          isActive ? "text-primary-700" : "text-primary-600"
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
        />
      </svg>
    </button>
  );
};
