import { describe, it, expect, beforeEach, vi, Mock } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCharacterFilters } from "./useCharacterFilters";
import { useCharacterStore } from "@/presentation/store/characterStore";
import { useUIStore } from "@/presentation/store/uiStore";

vi.mock("@/presentation/store/characterStore");
vi.mock("@/presentation/store/uiStore");

describe("useCharacterFilters", () => {
  const mockSetFilters = vi.fn();
  const mockToggleFilterModal = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useCharacterStore as unknown as Mock).mockReturnValue({
      filters: {},
      setFilters: mockSetFilters,
    });

    (useUIStore as unknown as Mock).mockReturnValue({
      isFilterModalOpen: false,
      toggleFilterModal: mockToggleFilterModal,
    });
  });

  it("should initialize with empty search term", () => {
    const { result } = renderHook(() => useCharacterFilters());

    expect(result.current.searchTerm).toBe("");
  });

  it("should update search term", () => {
    const { result } = renderHook(() => useCharacterFilters());

    act(() => {
      result.current.handleSearchChange("Rick");
    });

    expect(result.current.searchTerm).toBe("Rick");
  });

  it("should debounce search and update filters", async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useCharacterFilters());

    act(() => {
      result.current.handleSearchChange("Rick");
    });

    expect(mockSetFilters).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(mockSetFilters).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Rick",
      })
    );

    vi.useRealTimers();
  });

  it("should toggle filter modal", () => {
    const { result } = renderHook(() => useCharacterFilters());

    act(() => {
      result.current.toggleFilterModal();
    });

    expect(mockToggleFilterModal).toHaveBeenCalled();
  });

  it("should handle filter changes", () => {
    const { result } = renderHook(() => useCharacterFilters());

    const newFilters = { species: "Human" };

    act(() => {
      result.current.handleFilterChange(newFilters);
    });

    expect(mockSetFilters).toHaveBeenCalledWith({ ...newFilters, page: 1 });
  });
});
