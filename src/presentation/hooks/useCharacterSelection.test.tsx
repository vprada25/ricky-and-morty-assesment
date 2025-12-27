import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useCharacterSelection } from "./useCharacterSelection";
import { useCharacterStore } from "@/presentation/store/characterStore";
import { useUIStore } from "@/presentation/store/uiStore";
import { useFavoritesStore } from "@/presentation/store/favoritesStore";

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: undefined }),
  };
});

vi.mock("@/presentation/store/characterStore");
vi.mock("@/presentation/store/uiStore");
vi.mock("@/presentation/store/favoritesStore");

describe("useCharacterSelection", () => {
  const mockFetchCharacterById = vi.fn();
  const mockClearCurrentCharacter = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useCharacterStore as unknown as Mock).mockReturnValue({
      characters: [],
      currentCharacter: null,
      fetchCharacterById: mockFetchCharacterById,
      clearCurrentCharacter: mockClearCurrentCharacter,
    });

    (useUIStore as unknown as Mock).mockReturnValue({
      error: null,
    });

    (useFavoritesStore as unknown as Mock).mockReturnValue({
      favorites: [],
    });
  });

  it("should return initial state", () => {
    const { result } = renderHook(() => useCharacterSelection(), {
      wrapper: MemoryRouter,
    });

    expect(result.current.selectedId).toBeUndefined();
    expect(result.current.currentCharacter).toBeNull();
    expect(result.current.isFavorite).toBe(false);
  });

  it("should provide handleCharacterSelect function", () => {
    const { result } = renderHook(() => useCharacterSelection(), {
      wrapper: MemoryRouter,
    });

    expect(result.current.handleCharacterSelect).toBeDefined();
    expect(typeof result.current.handleCharacterSelect).toBe("function");
  });

  it("should check if character is favorite", () => {
    const mockCharacter = {
      id: "1",
      name: "Rick",
      status: "Alive",
      species: "Human",
      type: "",
      gender: "Male",
      origin: { name: "Earth", url: "" },
      location: { name: "Earth", url: "" },
      image: "rick.jpg",
      episode: [],
      url: "",
      created: "",
    };

    (useCharacterStore as unknown as Mock).mockReturnValue({
      characters: [],
      currentCharacter: mockCharacter,
      fetchCharacterById: mockFetchCharacterById,
      clearCurrentCharacter: mockClearCurrentCharacter,
    });

    (useFavoritesStore as unknown as Mock).mockReturnValue({
      favorites: [mockCharacter],
    });

    const { result } = renderHook(() => useCharacterSelection(), {
      wrapper: MemoryRouter,
    });

    expect(result.current.isFavorite).toBe(true);
  });
});
