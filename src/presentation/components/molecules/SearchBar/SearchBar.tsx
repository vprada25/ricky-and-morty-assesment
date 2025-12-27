import { FC } from "react";
import { SearchBarProps } from "./SearchBar.types";
import {
  SearchInput,
  FilterToggleButton,
} from "@/presentation/components/atoms";
import { FilterDropdown } from "../FilterDropdown";

export const SearchBar: FC<SearchBarProps> = ({
  value,
  onChange,
  onToggleFilter,
  placeholder = "Search or filter results",
  isFilterOpen = false,
  onFilterChange,
  currentFilters = {},
}) => {
  return (
    <div className="space-y-3">
      <div className="relative">
        <SearchInput
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />

        <FilterToggleButton onClick={onToggleFilter} isActive={isFilterOpen} />

        {onFilterChange && (
          <FilterDropdown
            isOpen={isFilterOpen}
            onClose={onToggleFilter}
            onFilterChange={onFilterChange}
            currentFilters={currentFilters}
          />
        )}
      </div>
    </div>
  );
};
