import { StoragePort } from "@domain/ports/StoragePort";
import { Character } from "@domain/entities/Character";

export class LocalStorageAdapter implements StoragePort {
  private readonly FAVORITES_KEY = "rickandmorty_favorites";
  private readonly COMMENTS_KEY = "rickandmorty_comments";
  private readonly DELETED_KEY = "rickandmorty_deleted";

  getFavoriteIds(): string[] {
    const stored = localStorage.getItem(this.FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  addFavorite(character: Character): void {
    const favoriteIds = this.getFavoriteIds();

    if (!favoriteIds.includes(character.id)) {
      favoriteIds.push(character.id);
      localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favoriteIds));
    }
  }

  removeFavorite(characterId: string): void {
    const favoriteIds = this.getFavoriteIds();
    const filtered = favoriteIds.filter((id) => id !== characterId);
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(filtered));
  }

  isFavorite(characterId: string): boolean {
    const favoriteIds = this.getFavoriteIds();
    return favoriteIds.includes(characterId);
  }

  getComments(characterId: string): string[] {
    const stored = localStorage.getItem(this.COMMENTS_KEY);
    const allComments: Record<string, string[]> = stored
      ? JSON.parse(stored)
      : {};
    return allComments[characterId] || [];
  }

  addComment(characterId: string, comment: string): void {
    const stored = localStorage.getItem(this.COMMENTS_KEY);
    const allComments: Record<string, string[]> = stored
      ? JSON.parse(stored)
      : {};

    if (!allComments[characterId]) {
      allComments[characterId] = [];
    }

    allComments[characterId].push(comment);
    localStorage.setItem(this.COMMENTS_KEY, JSON.stringify(allComments));
  }

  getDeletedCharacters(): string[] {
    const stored = localStorage.getItem(this.DELETED_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  softDeleteCharacter(characterId: string): void {
    const deleted = this.getDeletedCharacters();
    if (!deleted.includes(characterId)) {
      deleted.push(characterId);
      localStorage.setItem(this.DELETED_KEY, JSON.stringify(deleted));
    }
  }

  restoreCharacter(characterId: string): void {
    const deleted = this.getDeletedCharacters();
    const filtered = deleted.filter((id) => id !== characterId);
    localStorage.setItem(this.DELETED_KEY, JSON.stringify(filtered));
  }

  isDeleted(characterId: string): boolean {
    const deleted = this.getDeletedCharacters();
    return deleted.includes(characterId);
  }
}
