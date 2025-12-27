import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFilterDropdown } from "./useFilterDropdown";
import { SpeciesType, CharacterType } from "@/domain/entities/enums";

describe("useFilterDropdown", () => {
  const mockOnClose = vi.fn();
  const mockOnFilterChange = vi.fn();

  const defaultProps = {
    isOpen: false,
    onClose: mockOnClose,
    onFilterChange: mockOnFilterChange,
    currentFilters: {},
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with filters from props", () => {
    const props = {
      ...defaultProps,
      currentFilters: { species: "Human" },
    };

    const { result } = renderHook(() => useFilterDropdown(props));

    expect(result.current.speciesType).toBe(SpeciesType.Human);
  });

  it("should update species type", () => {
    const { result } = renderHook(() => useFilterDropdown(defaultProps));

    act(() => {
      result.current.setSpeciesType(SpeciesType.Alien);
    });

    expect(result.current.speciesType).toBe(SpeciesType.Alien);
  });

  it("should update character type", () => {
    const { result } = renderHook(() => useFilterDropdown(defaultProps));

    act(() => {
      result.current.setCharacterType(CharacterType.Starred);
    });

    expect(result.current.characterType).toBe(CharacterType.Starred);
  });

  it("should apply filters and close dropdown", () => {
    const { result } = renderHook(() => useFilterDropdown(defaultProps));

    act(() => {
      result.current.setSpeciesType(SpeciesType.Human);
      result.current.setCharacterType(CharacterType.Starred);
    });

    act(() => {
      result.current.handleApplyFilters();
    });

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      species: "Human",
      characterType: CharacterType.Starred,
      page: 1,
    });
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should detect active filters", () => {
    const { result } = renderHook(() => useFilterDropdown(defaultProps));

    expect(result.current.hasActiveFilters).toBe(false);

    act(() => {
      result.current.setSpeciesType(SpeciesType.Human);
    });

    expect(result.current.hasActiveFilters).toBe(true);
  });

  it("should provide dropdown ref", () => {
    const { result } = renderHook(() => useFilterDropdown(defaultProps));

    expect(result.current.dropdownRef).toBeDefined();
    expect(result.current.dropdownRef.current).toBeNull();
  });
});
