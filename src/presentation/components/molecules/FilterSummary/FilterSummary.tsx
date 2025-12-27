import { FC } from "react";
import { FilterSummaryProps } from "./FilterSummary.types";
import { ResultCount, FilterBadge } from "@/presentation/components/atoms";

export const FilterSummary: FC<FilterSummaryProps> = ({
  resultCount,
  filterCount,
}) => {
  if (filterCount === 0) return null;

  return (
    <div className="flex justify-between items-center mt-5">
      <ResultCount count={resultCount} />
      <FilterBadge count={filterCount} />
    </div>
  );
};
