import { CharacterRepository } from "@domain/repositories/CharacterRepository";
import type {
  CharacterFilters,
  CharactersResponse,
  SortOrder,
} from "@domain/entities/Character";

export class GetCharactersUseCase {
  constructor(private characterRepository: CharacterRepository) {}

  async execute(filters?: CharacterFilters): Promise<CharactersResponse> {
    return await this.characterRepository.getCharacters(filters);
  }
}

export class GetCharacterByIdUseCase {
  constructor(private characterRepository: CharacterRepository) {}

  async execute(id: string) {
    return await this.characterRepository.getCharacterById(id);
  }
}

export class GetCharactersByIdsUseCase {
  constructor(private characterRepository: CharacterRepository) {}

  async execute(ids: string[]) {
    return await this.characterRepository.getCharactersByIds(ids);
  }
}

export class SortCharactersUseCase {
  execute(characters: CharactersResponse["results"], order: SortOrder) {
    const sorted = [...characters].sort((a, b) => {
      if (order === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    return sorted;
  }
}
