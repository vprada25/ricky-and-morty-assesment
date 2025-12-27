import { useEffect, useState } from "react";
import {
  useCharacterStore,
  useUIStore,
  useFavoritesStore,
} from "@/presentation/store";
import { CharacterType } from "@/domain/entities/enums";

export const useCharacterData = () => {
  const { characters, info, fetchCharacters, filters } = useCharacterStore();
  const { isLoading, error, clearError } = useUIStore();
  const { favorites, fetchFavorites, toggleFavorite, isFavorite } =
    useFavoritesStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    fetchCharacters({ page: currentPage }).finally(() => {
      setIsInitialLoad(false);
    });
    fetchFavorites();
  }, [currentPage, fetchCharacters, fetchFavorites]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchCharacters({ page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Apply character type filter
  const characterType = filters.characterType as CharacterType;

  let filteredCharacters = characters;

  // Filter by character type (Starred/Others)
  if (characterType === CharacterType.Starred) {
    // Show only favorites
    filteredCharacters = characters.filter((char) => isFavorite(char.id));
  } else if (characterType === CharacterType.Others) {
    // Show only non-favorites
    filteredCharacters = characters.filter((char) => !isFavorite(char.id));
  }

  // Filter favorites based on current species/name filter
  let displayedFavorites = favorites;

  // Apply the same filters to favorites as we apply to regular characters
  if (filters.species) {
    displayedFavorites = displayedFavorites.filter(
      (fav) => fav.species === filters.species
    );
  }

  if (filters.name) {
    displayedFavorites = displayedFavorites.filter((fav) =>
      fav.name.toLowerCase().includes(filters.name!.toLowerCase())
    );
  }

  const currentFavorites =
    characterType === CharacterType.Others ? [] : displayedFavorites;

  // Filter out favorites from the regular characters list
  const nonFavoriteCharacters = filteredCharacters.filter(
    (character) => !favorites.some((fav) => fav.id === character.id)
  );

  return {
    characters: filteredCharacters,
    currentFavorites,
    nonFavoriteCharacters,
    info,
    loading: isLoading,
    error,
    isInitialLoad,
    currentPage,
    handlePageChange,
    toggleFavorite,
    clearError,
    activeCharacterType: characterType,
  };
};
