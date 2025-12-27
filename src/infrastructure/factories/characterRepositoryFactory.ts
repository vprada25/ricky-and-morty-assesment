import { CharacterRepository } from "@/domain/repositories/CharacterRepository";
import { GraphQLCharacterRepository } from "../repositories/GraphQLCharacterRepository";

/**
 * Factory function to create a CharacterRepository instance
 * Follows the Factory pattern for dependency injection
 */
export const createCharacterRepository = (): CharacterRepository => {
  return new GraphQLCharacterRepository();
};
