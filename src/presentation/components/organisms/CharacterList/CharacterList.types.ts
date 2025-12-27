import { Character } from "@/domain/entities/Character";

export interface CharacterListProps {
  title: string;
  characters: Character[];
  selectedId?: string;
  isFavorite: boolean;
  onCharacterClick: (character: Character) => void;
  onFavoriteClick: (character: Character) => void;
}
