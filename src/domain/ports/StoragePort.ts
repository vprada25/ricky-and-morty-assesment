import { Character } from "../entities/Character";

export interface StoragePort {
  getFavoriteIds(): string[];
  addFavorite(character: Character): void;
  removeFavorite(characterId: string): void;
  isFavorite(characterId: string): boolean;

  getComments(characterId: string): string[];
  addComment(characterId: string, comment: string): void;

  getDeletedCharacters(): string[];
  softDeleteCharacter(characterId: string): void;
  restoreCharacter(characterId: string): void;
  isDeleted(characterId: string): boolean;
}
