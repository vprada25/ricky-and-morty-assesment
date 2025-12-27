import { useState, useEffect, useRef, useMemo } from "react";
import { CharacterFilters } from "@/domain/entities/Character";
import { useCharacterStore, useUIStore } from "@/presentation/store";
import { useDebounce } from "./useDebounce";

export const useCharacterFilters = () => {
  const { setFilters } = useCharacterStore();
  const { isFilterModalOpen, toggleFilterModal } = useUIStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentFilters, setCurrentFilters] = useState<CharacterFilters>({});
  const isFirstRender = useRef(true);

  // Debounce search term to avoid excessive API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Apply search filter when debounced value changes
  useEffect(() => {
    // Skip the first render to avoid unnecessary API call
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Create new filters with the debounced search term
    const newFilters: CharacterFilters = {
      ...currentFilters,
      page: 1,
    };

    // Add or remove name filter based on search term
    if (debouncedSearchTerm) {
      newFilters.name = debouncedSearchTerm;
    } else {
      delete newFilters.name;
    }

    setFilters(newFilters);
  }, [debouncedSearchTerm, currentFilters, setFilters]);

  const handleFilterChange = (filters: CharacterFilters) => {
    setCurrentFilters(filters);
    setFilters({ ...filters, page: 1 });
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  // Memoize the current filters for return
  const returnFilters = useMemo(() => {
    const filters = { ...currentFilters };

    // Add or remove name based on debounced search term
    if (debouncedSearchTerm) {
      filters.name = debouncedSearchTerm;
    } else {
      delete filters.name;
    }

    // Clean up empty values
    const cleanedFilters = Object.entries(filters).reduce(
      (acc, [key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          acc[key as keyof CharacterFilters] = value as any;
        }
        return acc;
      },
      {} as CharacterFilters
    );

    return cleanedFilters;
  }, [debouncedSearchTerm, currentFilters]);

  return {
    searchTerm,
    currentFilters: returnFilters,
    isFilterModalOpen,
    handleFilterChange,
    handleSearchChange,
    toggleFilterModal,
  };
};
