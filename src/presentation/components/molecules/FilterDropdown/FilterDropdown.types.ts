import { CharacterFilters } from "@domain/entities/Character";
import { CharacterType, SpeciesType } from "@domain/entities/enums";

export interface FilterDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onFilterChange: (filters: CharacterFilters) => void;
  currentFilters: CharacterFilters;
}

export { CharacterType, SpeciesType };
