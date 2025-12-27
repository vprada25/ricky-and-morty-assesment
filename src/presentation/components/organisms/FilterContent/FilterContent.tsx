import { FC } from "react";
import { CharacterType, SpeciesType } from "@domain/entities/enums";
import { FilterSection } from "@/presentation/components/molecules";
import { FilterButton } from "@/presentation/components/atoms";

interface FilterContentProps {
  characterType: CharacterType;
  speciesType: SpeciesType;
  onCharacterTypeChange: (type: CharacterType) => void;
  onSpeciesTypeChange: (type: SpeciesType) => void;
}

export const FilterContent: FC<FilterContentProps> = ({
  characterType,
  speciesType,
  onCharacterTypeChange,
  onSpeciesTypeChange,
}) => {
  return (
    <>
      <FilterSection label="Characters">
        <FilterButton
          label="All"
          isSelected={characterType === CharacterType.All}
          onClick={() => onCharacterTypeChange(CharacterType.All)}
        />
        <FilterButton
          label="Starred"
          isSelected={characterType === CharacterType.Starred}
          onClick={() => onCharacterTypeChange(CharacterType.Starred)}
        />
        <FilterButton
          label="Others"
          isSelected={characterType === CharacterType.Others}
          onClick={() => onCharacterTypeChange(CharacterType.Others)}
        />
      </FilterSection>

      <FilterSection label="Specie">
        <FilterButton
          label="All"
          isSelected={speciesType === SpeciesType.All}
          onClick={() => onSpeciesTypeChange(SpeciesType.All)}
        />
        <FilterButton
          label="Human"
          isSelected={speciesType === SpeciesType.Human}
          onClick={() => onSpeciesTypeChange(SpeciesType.Human)}
        />
        <FilterButton
          label="Alien"
          isSelected={speciesType === SpeciesType.Alien}
          onClick={() => onSpeciesTypeChange(SpeciesType.Alien)}
        />
      </FilterSection>
    </>
  );
};
