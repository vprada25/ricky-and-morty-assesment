import { StoragePort } from "@domain/ports/StoragePort";
import { Character } from "@domain/entities/Character";

export class ManageFavoritesUseCase {
  constructor(private storage: StoragePort) {}

  toggleFavorite(character: Character): boolean {
    if (this.storage.isFavorite(character.id)) {
      this.storage.removeFavorite(character.id);
      return false;
    } else {
      this.storage.addFavorite(character);
      return true;
    }
  }

  getFavorites(): Character[] {
    // Note: Storage only returns IDs
    // Character objects are fetched and combined at the store level
    // This method is deprecated and should be removed in favor of getFavoriteIds
    return [];
  }

  isFavorite(characterId: string): boolean {
    return this.storage.isFavorite(characterId);
  }
}

export class ManageCommentsUseCase {
  constructor(private storage: StoragePort) {}

  addComment(characterId: string, comment: string): void {
    if (comment.trim()) {
      this.storage.addComment(characterId, comment);
    }
  }

  getComments(characterId: string): string[] {
    return this.storage.getComments(characterId);
  }
}

export class ManageDeletedCharactersUseCase {
  constructor(private storage: StoragePort) {}

  softDelete(characterId: string): void {
    this.storage.softDeleteCharacter(characterId);
  }

  restore(characterId: string): void {
    this.storage.restoreCharacter(characterId);
  }

  isDeleted(characterId: string): boolean {
    return this.storage.isDeleted(characterId);
  }

  getDeletedIds(): string[] {
    return this.storage.getDeletedCharacters();
  }
}
