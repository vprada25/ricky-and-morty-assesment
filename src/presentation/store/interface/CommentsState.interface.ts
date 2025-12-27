import { ManageCommentsUseCase } from "@/application";

export interface CommentsState {
  manageCommentsUseCase: ManageCommentsUseCase;

  addComment: (characterId: string, comment: string) => void;
  getComments: (characterId: string) => string[];
}