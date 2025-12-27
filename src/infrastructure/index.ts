// GraphQL Client
export { apolloClient } from "./graphql/apolloClient";

// Adapters
export { LocalStorageAdapter } from "./storage/LocalStorageAdapter";
export { GraphQLCharacterRepository } from "./repositories/GraphQLCharacterRepository";

// Factories
export { createCharacterRepository, createStorageAdapter } from "./factories";
