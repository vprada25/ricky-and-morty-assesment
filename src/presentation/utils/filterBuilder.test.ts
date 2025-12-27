import { describe, it, expect } from "vitest";
import {
  FilterBuilder,
  SpeciesFilterParser,
  CharacterTypeFilterParser,
} from "./filterBuilder";
import { SpeciesType, CharacterType } from "@/domain/entities/enums";

describe("FilterBuilder", () => {
  it("should build filters with species", () => {
    const builder = new FilterBuilder();
    const result = builder.withSpecies(SpeciesType.Human).build();

    expect(result).toEqual({ page: 1, species: "Human" });
  });

  it("should build filters with character type (Starred)", () => {
    const builder = new FilterBuilder();
    const result = builder.withCharacterType(CharacterType.Starred).build();

    expect(result).toEqual({ page: 1, characterType: CharacterType.Starred });
  });

  it("should build filters with search term", () => {
    const builder = new FilterBuilder();
    const result = builder.withSearchTerm("Rick").build();

    expect(result).toEqual({ page: 1, name: "Rick" });
  });

  it("should build combined filters", () => {
    const builder = new FilterBuilder();
    const result = builder
      .withSpecies(SpeciesType.Human)
      .withCharacterType(CharacterType.Starred)
      .withSearchTerm("Rick")
      .build();

    expect(result).toEqual({
      page: 1,
      species: "Human",
      characterType: CharacterType.Starred,
      name: "Rick",
    });
  });

  it("should not include species when All is selected", () => {
    const builder = new FilterBuilder();
    const result = builder.withSpecies(SpeciesType.All).build();

    expect(result).toEqual({ page: 1 });
  });

  it("should not include characterType when All is selected", () => {
    const builder = new FilterBuilder();
    const result = builder.withCharacterType(CharacterType.All).build();

    expect(result).toEqual({ page: 1 });
  });

  it("should not include empty search term", () => {
    const builder = new FilterBuilder();
    const result = builder.withSearchTerm("").build();

    expect(result).toEqual({ page: 1 });
  });
});

describe("SpeciesFilterParser", () => {
  const parser = new SpeciesFilterParser();

  it("should parse Human species", () => {
    expect(parser.parse({ species: "Human" })).toBe(SpeciesType.Human);
  });

  it("should parse Alien species", () => {
    expect(parser.parse({ species: "Alien" })).toBe(SpeciesType.Alien);
  });

  it("should default to All for unknown species", () => {
    expect(parser.parse({ species: "Unknown" })).toBe(SpeciesType.All);
  });

  it("should default to All when no species", () => {
    expect(parser.parse({})).toBe(SpeciesType.All);
  });
});

describe("CharacterTypeFilterParser", () => {
  const parser = new CharacterTypeFilterParser();

  it("should parse Starred character type", () => {
    expect(parser.parse({ characterType: CharacterType.Starred })).toBe(
      CharacterType.Starred
    );
  });

  it("should parse Others character type", () => {
    expect(parser.parse({ characterType: CharacterType.Others })).toBe(
      CharacterType.Others
    );
  });

  it("should default to All for unknown character type", () => {
    expect(parser.parse({ characterType: "Unknown" as string })).toBe(
      CharacterType.All
    );
  });

  it("should default to All when no character type", () => {
    expect(parser.parse({})).toBe(CharacterType.All);
  });
});
