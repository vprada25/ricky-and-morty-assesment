import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useCharacterData } from "./useCharacterData";
import { useCharacterStore } from "@/presentation/store/characterStore";
import { useUIStore } from "@/presentation/store/uiStore";
import { useFavoritesStore } from "@/presentation/store/favoritesStore";
import {
  Character,
  CharacterGender,
  CharacterStatus,
} from "@/domain/entities/Character";
import type { Mock } from "vitest";

vi.mock("@/presentation/store/characterStore");
vi.mock("@/presentation/store/uiStore");
vi.mock("@/presentation/store/favoritesStore");

describe("useCharacterData", () => {
  const mockCharacters: Character[] = [
    {
      id: "1",
      name: "Rick Sanchez",
      status: CharacterStatus.Alive,
      species: "Human",
      type: "",
      gender: CharacterGender.Female,
      origin: { name: "Earth", url: "" },
      location: { name: "Earth", url: "" },
      image: "rick.jpg",
      episode: [],
      url: "",
      created: "",
    },
  ];

  const mockFetchCharacters = vi.fn();
  const mockFetchFavorites = vi.fn();
  const mockToggleFavorite = vi.fn();
  const mockIsFavorite = vi.fn();
  const mockClearError = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    mockFetchCharacters.mockResolvedValue(undefined);
    mockFetchFavorites.mockResolvedValue(undefined);

    (useCharacterStore as unknown as Mock).mockReturnValue({
      characters: mockCharacters,
      info: { pages: 1 },
      filters: {},
      fetchCharacters: mockFetchCharacters,
    });

    (useUIStore as unknown as Mock).mockReturnValue({
      isLoading: false,
      error: null,
      clearError: mockClearError,
    });

    (useFavoritesStore as unknown as Mock).mockReturnValue({
      favorites: [],
      fetchFavorites: mockFetchFavorites,
      toggleFavorite: mockToggleFavorite,
      isFavorite: mockIsFavorite,
    });
  });

  it("should fetch characters on mount", async () => {
    renderHook(() => useCharacterData());

    await waitFor(() => {
      expect(mockFetchCharacters).toHaveBeenCalled();
    });
  });

  it("should fetch favorites on mount", async () => {
    renderHook(() => useCharacterData());

    await waitFor(() => {
      expect(mockFetchFavorites).toHaveBeenCalled();
    });
  });

  it("should return characters data", () => {
    const { result } = renderHook(() => useCharacterData());

    expect(result.current.characters).toEqual(mockCharacters);
    expect(result.current.info).toEqual({ pages: 1 });
  });

  it("should return loading state", () => {
    (useUIStore as unknown as Mock).mockReturnValue({
      isLoading: true,
      error: null,
      clearError: mockClearError,
    });

    const { result } = renderHook(() => useCharacterData());

    expect(result.current.loading).toBe(true);
  });

  it("should return error state", () => {
    (useUIStore as unknown as Mock).mockReturnValue({
      isLoading: false,
      error: "API Error",
      clearError: mockClearError,
    });

    const { result } = renderHook(() => useCharacterData());

    expect(result.current.error).toBe("API Error");
  });

  it("should provide handlePageChange function", () => {
    const { result } = renderHook(() => useCharacterData());

    expect(result.current.handlePageChange).toBeDefined();
    expect(typeof result.current.handlePageChange).toBe("function");
  });

  it("should provide toggleFavorite function", () => {
    const { result } = renderHook(() => useCharacterData());

    expect(result.current.toggleFavorite).toBeDefined();
    expect(result.current.toggleFavorite).toBe(mockToggleFavorite);
  });
});
