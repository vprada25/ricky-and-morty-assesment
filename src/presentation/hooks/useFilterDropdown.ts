import { useState, useEffect, useRef, useCallback } from "react";
import { CharacterType, SpeciesType } from "@/domain/entities/enums";
import { CharacterFilters } from "@/domain/entities/Character";
import {
  FilterBuilder,
  SpeciesFilterParser,
  CharacterTypeFilterParser,
} from "../utils/filterBuilder";

interface UseFilterDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onFilterChange: (filters: CharacterFilters) => void;
  currentFilters: CharacterFilters;
}

export const useFilterDropdown = ({
  isOpen,
  onClose,
  onFilterChange,
  currentFilters,
}: UseFilterDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialize parsers (Strategy Pattern)
  const speciesParser = new SpeciesFilterParser();
  const characterTypeParser = new CharacterTypeFilterParser();

  // Parse current filters to initial state
  const [characterType, setCharacterType] = useState<CharacterType>(() =>
    characterTypeParser.parse(currentFilters)
  );
  const [speciesType, setSpeciesType] = useState<SpeciesType>(() =>
    speciesParser.parse(currentFilters)
  );

  // Handle click outside with useCallback for optimization
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const target = event.target as Node;

      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        const isFilterButton = (target as HTMLElement).closest(
          '[aria-label="Toggle filters"]'
        );

        if (!isFilterButton) {
          onClose();
        }
      }
    },
    [onClose]
  );

  // Setup click outside listener (desktop only)
  useEffect(() => {
    const isMobile = window.innerWidth < 1024;

    if (isOpen && !isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, handleClickOutside]);

  // Apply filters using Builder Pattern
  const handleApplyFilters = useCallback(() => {
    const filters = new FilterBuilder()
      .withSpecies(speciesType)
      .withCharacterType(characterType)
      .withSearchTerm(currentFilters.name)
      .build();

    onFilterChange(filters);
    onClose();
  }, [
    speciesType,
    characterType,
    currentFilters.name,
    onFilterChange,
    onClose,
  ]);

  // Check if any filter is active (not "All")
  const hasActiveFilters =
    characterType !== CharacterType.All || speciesType !== SpeciesType.All;

  return {
    dropdownRef,
    characterType,
    speciesType,
    setCharacterType,
    setSpeciesType,
    handleApplyFilters,
    hasActiveFilters,
  };
};
