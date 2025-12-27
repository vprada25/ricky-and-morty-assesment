import { createStorageAdapter } from "@infrastructure/index";
import { ManageCommentsUseCase } from "@application/index";
import { create } from "zustand";

interface CommentsState {
  manageCommentsUseCase: ManageCommentsUseCase;

  addComment: (characterId: string, comment: string) => void;
  getComments: (characterId: string) => string[];
}

const storageAdapter = createStorageAdapter();

export const useCommentsStore = create<CommentsState>(() => ({
  manageCommentsUseCase: new ManageCommentsUseCase(storageAdapter),

  addComment: (characterId: string, comment: string) => {
    const manageCommentsUseCase = new ManageCommentsUseCase(storageAdapter);
    manageCommentsUseCase.addComment(characterId, comment);
  },

  getComments: (characterId: string) => {
    const manageCommentsUseCase = new ManageCommentsUseCase(storageAdapter);
    return manageCommentsUseCase.getComments(characterId);
  },
}));
