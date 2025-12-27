import { describe, it, expect } from "vitest";

import { SortCharactersUseCase } from "./CharacterUseCases";
import { Character } from "../../domain/entities/Character";
import {
  CharacterStatus,
  CharacterGender,
  SortOrder,
} from "../../domain/entities/enums";

const mockCharacters: Character[] = [
  {
    id: "1",
    name: "Morty Smith",
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
  },
  {
    id: "2",
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
  },
  {
    id: "3",
    name: "Abradolf Lincler",
    status: CharacterStatus.Dead,
    species: "Human",
    type: "Genetic experiment",
    gender: CharacterGender.Male,
    origin: { name: "Earth", url: "" },
    location: { name: "Earth", url: "" },
    image: "",
    episode: [],
    url: "",
    created: "",
  },
];

describe("SortCharactersUseCase", () => {
  const sortUseCase = new SortCharactersUseCase();

  it("should sort characters in ascending order (A-Z)", () => {
    const result = sortUseCase.execute(mockCharacters, SortOrder.Asc);

    expect(result[0].name).toBe("Abradolf Lincler");
    expect(result[1].name).toBe("Morty Smith");
    expect(result[2].name).toBe("Rick Sanchez");
  });

  it("should sort characters in descending order (Z-A)", () => {
    const result = sortUseCase.execute(mockCharacters, SortOrder.Desc);

    expect(result[0].name).toBe("Rick Sanchez");
    expect(result[1].name).toBe("Morty Smith");
    expect(result[2].name).toBe("Abradolf Lincler");
  });

  it("should not mutate the original array", () => {
    const original = [...mockCharacters];
    sortUseCase.execute(mockCharacters, SortOrder.Asc);

    expect(mockCharacters).toEqual(original);
  });
});
