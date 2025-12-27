import { apolloClient } from "../graphql/apolloClient";
import {
  GET_CHARACTERS,
  GET_CHARACTER_BY_ID,
  GET_CHARACTERS_BY_IDS,
} from "../graphql/queries";
import { CharacterRepository } from "@domain/repositories/CharacterRepository";
import {
  Character,
  CharacterFilters,
  CharactersResponse,
} from "@domain/entities/Character";

// Adapter - Implements the CharacterRepository port using GraphQL
export class GraphQLCharacterRepository implements CharacterRepository {
  async getCharacters(filters?: CharacterFilters): Promise<CharactersResponse> {
    const { page = 1, ...restFilters } = filters || {};

    // Remove empty filter values
    const cleanFilters = Object.entries(restFilters).reduce(
      (acc, [key, value]) => {
        if (value && value !== "") {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, unknown>
    );

    const { data } = await apolloClient.query({
      query: GET_CHARACTERS,
      variables: {
        page,
        filter: Object.keys(cleanFilters).length > 0 ? cleanFilters : undefined,
      },
    });

    // Limit results to 10 characters per page
    const limitedResults = data.characters.results.slice(0, 10);

    return {
      ...data.characters,
      results: limitedResults,
    };
  }

  async getCharacterById(id: string): Promise<Character> {
    const { data } = await apolloClient.query({
      query: GET_CHARACTER_BY_ID,
      variables: { id },
    });

    return data.character;
  }

  async getCharactersByIds(ids: string[]): Promise<Character[]> {
    if (ids.length === 0) return [];

    const { data } = await apolloClient.query({
      query: GET_CHARACTERS_BY_IDS,
      variables: { ids },
    });

    return data.charactersByIds;
  }
}
