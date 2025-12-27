import { GetCharactersByIdsUseCase, ManageFavoritesUseCase } from '@/application'
import { Character } from '@/domain'

export interface FavoritesState {
  favorites: Character[]
  favoriteIds: string[]

  manageFavoritesUseCase: ManageFavoritesUseCase
  getCharactersByIdsUseCase: GetCharactersByIdsUseCase

  toggleFavorite: (character: Character) => void
  fetchFavorites: () => Promise<void>
  isFavorite: (characterId: string) => boolean
}
