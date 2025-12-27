import { ManageDeletedCharactersUseCase } from '@/application'

export interface DeletedCharactersState {
  deletedIds: string[]

  manageDeletedCharactersUseCase: ManageDeletedCharactersUseCase

  softDelete: (characterId: string) => void
  restore: (characterId: string) => void
  isDeleted: (characterId: string) => boolean
}
