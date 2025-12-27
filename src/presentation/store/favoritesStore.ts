import { Character } from "@domain/entities/Character";
import { create } from "zustand";
import {
  ManageFavoritesUseCase,
  GetCharactersByIdsUseCase,
} from "@application/index";
import {
  createStorageAdapter,
  createCharacterRepository,
} from "@infrastructure/index";

interface FavoritesState {
  favorites: Character[];
  favoriteIds: string[];

  manageFavoritesUseCase: ManageFavoritesUseCase;
  getCharactersByIdsUseCase: GetCharactersByIdsUseCase;

  toggleFavorite: (character: Character) => void;
  fetchFavorites: () => Promise<void>;
  isFavorite: (characterId: string) => boolean;
}

const storageAdapter = createStorageAdapter();
const characterRepository = createCharacterRepository();

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  favoriteIds: storageAdapter.getFavoriteIds(),

  manageFavoritesUseCase: new ManageFavoritesUseCase(storageAdapter),
  getCharactersByIdsUseCase: new GetCharactersByIdsUseCase(characterRepository),

  toggleFavorite: (character: Character) => {
    get().manageFavoritesUseCase.toggleFavorite(character);
    const favoriteIds = storageAdapter.getFavoriteIds();
    set({ favoriteIds });
    get().fetchFavorites();
  },

  fetchFavorites: async () => {
    const favoriteIds = get().favoriteIds;
    if (favoriteIds.length === 0) {
      set({ favorites: [] });
      return;
    }

    try {
      const favorites = await get().getCharactersByIdsUseCase.execute(
        favoriteIds
      );
      set({ favorites });
    } catch (error) {
      console.error("Failed to fetch favorite characters:", error);
      set({ favorites: [] });
    }
  },

  isFavorite: (characterId: string) => {
    return get().favoriteIds.includes(characterId);
  },
}));
