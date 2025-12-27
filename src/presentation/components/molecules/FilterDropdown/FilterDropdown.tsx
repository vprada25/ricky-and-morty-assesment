import { FC } from "react";

import { FilterDesktopDropdown } from "@/presentation/components/organisms/FilterDesktopDropdown";
import { FilterMobileModal } from "@/presentation/components/organisms/FilterMobileModal";
import { FilterContent } from "@/presentation/components/organisms/FilterContent";
import { FilterDropdownProps } from "./FilterDropdown.types";
import { useFilterDropdown } from "@/presentation/hooks";

export const FilterDropdown: FC<FilterDropdownProps> = ({
  isOpen,
  onClose,
  onFilterChange,
  currentFilters,
}) => {
  const {
    dropdownRef,
    characterType,
    speciesType,
    setCharacterType,
    setSpeciesType,
    handleApplyFilters,
  } = useFilterDropdown({ isOpen, onClose, onFilterChange, currentFilters });

  if (!isOpen) return null;

  const filterContent = (
    <FilterContent
      characterType={characterType}
      speciesType={speciesType}
      onCharacterTypeChange={setCharacterType}
      onSpeciesTypeChange={setSpeciesType}
    />
  );

  return (
    <>
      <FilterMobileModal onClose={onClose} onApply={handleApplyFilters}>
        {filterContent}
      </FilterMobileModal>

      <FilterDesktopDropdown
        dropdownRef={dropdownRef}
        onApply={handleApplyFilters}
      >
        {filterContent}
      </FilterDesktopDropdown>
    </>
  );
};
