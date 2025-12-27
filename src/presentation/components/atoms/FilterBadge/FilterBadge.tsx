import { FC } from "react";
import { FilterBadgeProps } from "./FilterBadge.types";

export const FilterBadge: FC<FilterBadgeProps> = ({ count }) => {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
      {count} Filter{count > 1 ? "s" : ""}
    </span>
  );
};
