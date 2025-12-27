import { GetCharacterByIdUseCase, GetCharactersUseCase, SortCharactersUseCase } from "@/application";
import { Character, CharacterFilters, ResponseInfo, SortOrder } from "@/domain";

export interface CharacterState {
  characters: Character[];
  currentCharacter: Character | null;
  filters: CharacterFilters;
  sortOrder: SortOrder;
  info: ResponseInfo | null;

  getCharactersUseCase: GetCharactersUseCase;
  getCharacterByIdUseCase: GetCharacterByIdUseCase;
  sortCharactersUseCase: SortCharactersUseCase;

  fetchCharacters: (filters?: CharacterFilters) => Promise<void>;
  fetchCharacterById: (id: string) => Promise<void>;
  setFilters: (filters: CharacterFilters) => void;
  setSortOrder: (order: SortOrder) => void;
  clearCurrentCharacter: () => void;
}