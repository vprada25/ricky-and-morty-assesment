// Domain Entity: Character
import { CharacterStatus, CharacterGender, SortOrder } from "./enums";

export interface Character {
  id: string;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
  // Extended properties for our app
  isFavorite?: boolean;
  comments?: Comment[];
  isDeleted?: boolean;
}

export interface Location {
  name: string;
  url: string;
}

export interface Comment {
  id: string;
  text: string;
  createdAt: string;
  characterId: string;
}

export interface CharacterFilters {
  name?: string;
  status?: CharacterStatus | "";
  species?: string;
  gender?: CharacterGender | "";
  page?: number;
  characterType?: string;
}

export interface CharactersResponse {
  info: ResponseInfo;
  results: Character[];
}

export interface ResponseInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface CharacterSortOptions {
  order: SortOrder;
}

export { CharacterStatus, CharacterGender, SortOrder } from "./enums";
