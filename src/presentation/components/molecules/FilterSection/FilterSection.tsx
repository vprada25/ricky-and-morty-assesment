import { FC } from "react";
import { FilterSectionProps } from "./FilterSection.types";

export const FilterSection: FC<FilterSectionProps> = ({ label, children }) => {
  return (
    <div className="mb-3">
      <label className="block text-[10px] font-medium text-gray-500 mb-3 uppercase tracking-wide">
        {label}
      </label>
      <div className="flex gap-2">{children}</div>
    </div>
  );
};
