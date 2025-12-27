import { CharacterFilters } from "@/domain/entities/Character";

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onToggleFilter: () => void;
  placeholder?: string;
  isFilterOpen?: boolean;
  onFilterChange?: (filters: CharacterFilters) => void;
  currentFilters?: CharacterFilters;
}
