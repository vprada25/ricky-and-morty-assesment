import { create } from "zustand";
import { ManageDeletedCharactersUseCase } from "@application/index";
import { createStorageAdapter } from "@infrastructure/index";

interface DeletedCharactersState {
  deletedIds: string[];

  manageDeletedCharactersUseCase: ManageDeletedCharactersUseCase;

  softDelete: (characterId: string) => void;
  restore: (characterId: string) => void;
  isDeleted: (characterId: string) => boolean;
}

const storageAdapter = createStorageAdapter();

export const useDeletedCharactersStore = create<DeletedCharactersState>(
  (set, get) => ({
    deletedIds: storageAdapter.getDeletedCharacters(),

    manageDeletedCharactersUseCase: new ManageDeletedCharactersUseCase(
      storageAdapter
    ),

    softDelete: (characterId: string) => {
      get().manageDeletedCharactersUseCase.softDelete(characterId);
      set({ deletedIds: storageAdapter.getDeletedCharacters() });
    },

    restore: (characterId: string) => {
      get().manageDeletedCharactersUseCase.restore(characterId);
      set({ deletedIds: storageAdapter.getDeletedCharacters() });
    },

    isDeleted: (characterId: string) => {
      return get().deletedIds.includes(characterId);
    },
  })
);
