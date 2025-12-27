import { describe, it, expect, beforeEach } from "vitest";
import {
  ManageFavoritesUseCase,
  ManageCommentsUseCase,
  ManageDeletedCharactersUseCase,
} from "./StorageUseCases";
import { LocalStorageAdapter } from "@/infrastructure/storage/LocalStorageAdapter";
import { Character } from "@/domain/entities/Character";
import { CharacterStatus, CharacterGender } from "@/domain/entities/enums";

const mockCharacter: Character = {
  id: "1",
  name: "Rick Sanchez",
  status: CharacterStatus.Alive,
  species: "Human",
  type: "",
  gender: CharacterGender.Male,
  origin: { name: "Earth", url: "" },
  location: { name: "Earth", url: "" },
  image: "",
  episode: [],
  url: "",
  created: "",
};

describe("ManageFavoritesUseCase", () => {
  let storage: LocalStorageAdapter;
  let useCase: ManageFavoritesUseCase;

  beforeEach(() => {
    localStorage.clear();
    storage = new LocalStorageAdapter();
    useCase = new ManageFavoritesUseCase(storage);
  });

  it("should add character to favorites", () => {
    const result = useCase.toggleFavorite(mockCharacter);

    expect(result).toBe(true);
    expect(useCase.isFavorite(mockCharacter.id)).toBe(true);
  });

  it("should remove character from favorites", () => {
    useCase.toggleFavorite(mockCharacter);
    const result = useCase.toggleFavorite(mockCharacter);

    expect(result).toBe(false);
    expect(useCase.isFavorite(mockCharacter.id)).toBe(false);
  });

  it("should check if character is in favorites", () => {
    useCase.toggleFavorite(mockCharacter);

    expect(useCase.isFavorite(mockCharacter.id)).toBe(true);
  });
});

describe("ManageCommentsUseCase", () => {
  let storage: LocalStorageAdapter;
  let useCase: ManageCommentsUseCase;

  beforeEach(() => {
    localStorage.clear();
    storage = new LocalStorageAdapter();
    useCase = new ManageCommentsUseCase(storage);
  });

  it("should add comment to character", () => {
    useCase.addComment("1", "Great character!");
    const comments = useCase.getComments("1");

    expect(comments).toHaveLength(1);
    expect(comments[0]).toBe("Great character!");
  });

  it("should not add empty comment", () => {
    useCase.addComment("1", "   ");
    const comments = useCase.getComments("1");

    expect(comments).toHaveLength(0);
  });

  it("should get multiple comments", () => {
    useCase.addComment("1", "Comment 1");
    useCase.addComment("1", "Comment 2");
    const comments = useCase.getComments("1");

    expect(comments).toHaveLength(2);
  });
});

describe("ManageDeletedCharactersUseCase", () => {
  let storage: LocalStorageAdapter;
  let useCase: ManageDeletedCharactersUseCase;

  beforeEach(() => {
    localStorage.clear();
    storage = new LocalStorageAdapter();
    useCase = new ManageDeletedCharactersUseCase(storage);
  });

  it("should soft delete character", () => {
    useCase.softDelete("1");

    expect(useCase.isDeleted("1")).toBe(true);
  });

  it("should restore deleted character", () => {
    useCase.softDelete("1");
    useCase.restore("1");

    expect(useCase.isDeleted("1")).toBe(false);
  });

  it("should get all deleted character IDs", () => {
    useCase.softDelete("1");
    useCase.softDelete("2");
    const deleted = useCase.getDeletedIds();

    expect(deleted).toHaveLength(2);
    expect(deleted).toContain("1");
    expect(deleted).toContain("2");
  });
});
