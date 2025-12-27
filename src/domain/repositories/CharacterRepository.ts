import {
  Character,
  CharacterFilters,
  CharactersResponse,
} from "../entities/Character";

// Port (Interface) - Defines the contract for character data access
export interface CharacterRepository {
  getCharacters(filters?: CharacterFilters): Promise<CharactersResponse>;
  getCharacterById(id: string): Promise<Character>;
  getCharactersByIds(ids: string[]): Promise<Character[]>;
}
