import { StoragePort } from "@/domain/ports/StoragePort";
import { LocalStorageAdapter } from "../storage/LocalStorageAdapter";

/**
 * Factory function to create a StoragePort instance
 * Follows the Factory pattern for dependency injection
 */
export const createStorageAdapter = (): StoragePort => {
  return new LocalStorageAdapter();
};
