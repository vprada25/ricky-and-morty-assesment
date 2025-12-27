import { CharacterFilters } from '@/domain/entities/Character'
import { CharacterType, SpeciesType } from '@/domain'

export class FilterBuilder {
  private filters: CharacterFilters = { page: 1 }

  withSpecies(speciesType: SpeciesType): FilterBuilder {
    if (speciesType === SpeciesType.Human) {
      this.filters.species = SpeciesType.Human
    } else if (speciesType === SpeciesType.Alien) {
      this.filters.species = SpeciesType.Alien
    }
    return this
  }

  withCharacterType(characterType: CharacterType): FilterBuilder {
    if (characterType !== CharacterType.All) {
      this.filters.characterType = characterType
    }
    return this
  }

  withSearchTerm(searchTerm?: string): FilterBuilder {
    if (searchTerm) {
      this.filters.name = searchTerm
    }
    return this
  }

  withPage(page: number): FilterBuilder {
    this.filters.page = page
    return this
  }

  build(): CharacterFilters {
    return this.filters
  }
}

export interface FilterParseStrategy {
  parse(filters: CharacterFilters): SpeciesType | CharacterType
}

export class SpeciesFilterParser implements FilterParseStrategy {
  parse(filters: CharacterFilters): SpeciesType {
    if (filters.species === SpeciesType.Human) return SpeciesType.Human
    if (filters.species === SpeciesType.Alien) return SpeciesType.Alien
    return SpeciesType.All
  }
}

export class CharacterTypeFilterParser implements FilterParseStrategy {
  parse(filters: CharacterFilters): CharacterType {
    if (filters.characterType === CharacterType.Starred) return CharacterType.Starred
    if (filters.characterType === CharacterType.Others) return CharacterType.Others
    return CharacterType.All
  }
}
