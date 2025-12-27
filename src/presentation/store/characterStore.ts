import { useDeletedCharactersStore } from "./deletedCharactersStore";
import { createCharacterRepository } from "@infrastructure/index";
import { useUIStore } from "./uiStore";
import { create } from "zustand";
import {
  Character,
  CharacterFilters,
  ResponseInfo,
  SortOrder,
} from "@domain/entities/Character";
import {
  GetCharactersUseCase,
  GetCharacterByIdUseCase,
  SortCharactersUseCase,
} from "@application/index";

interface CharacterState {
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

const characterRepository = createCharacterRepository();

export const useCharacterStore = create<CharacterState>((set, get) => ({
  characters: [],
  currentCharacter: null,
  filters: {},
  sortOrder: SortOrder.Asc,
  info: null,

  getCharactersUseCase: new GetCharactersUseCase(characterRepository),
  getCharacterByIdUseCase: new GetCharacterByIdUseCase(characterRepository),
  sortCharactersUseCase: new SortCharactersUseCase(),

  fetchCharacters: async (filters?: CharacterFilters) => {
    const { setLoading, setError } = useUIStore.getState();
    const { deletedIds } = useDeletedCharactersStore.getState();

    setLoading(true);
    setError(null);

    try {
      // Extract characterType as it's a client-side filter, don't send to API

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { characterType, ...apiFilters } = filters || {};

      const response = await get().getCharactersUseCase.execute(apiFilters);

      const filteredResults = response.results.filter(
        (character) => !deletedIds.includes(character.id)
      );

      const sorted = get().sortCharactersUseCase.execute(
        filteredResults,
        get().sortOrder
      );

      set({
        characters: sorted,
        info: response.info,
        filters: filters || {},
      });

      setLoading(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch characters";

      setError(errorMessage);
      setLoading(false);
    }
  },

  fetchCharacterById: async (id: string) => {
    const { setLoading, setError } = useUIStore.getState();

    setLoading(true);
    setError(null);

    try {
      const character = await get().getCharacterByIdUseCase.execute(id);
      set({ currentCharacter: character });
      setLoading(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch character";

      setError(errorMessage);
      setLoading(false);
      set({ currentCharacter: null });
      throw error;
    }
  },

  setFilters: (filters: CharacterFilters) => {
    set({ filters });
    get().fetchCharacters(filters);
  },

  setSortOrder: (order: SortOrder) => {
    const sorted = get().sortCharactersUseCase.execute(get().characters, order);
    set({ sortOrder: order, characters: sorted });
  },

  clearCurrentCharacter: () => set({ currentCharacter: null }),
}));
