import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
  it("should return initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("test", 500));

    expect(result.current).toBe("test");
  });

  it("should debounce value changes", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );

    expect(result.current).toBe("initial");

    rerender({ value: "updated", delay: 500 });
    expect(result.current).toBe("initial");

    act(() => {
      vi.advanceTimersByTime(250);
    });
    expect(result.current).toBe("initial");

    act(() => {
      vi.advanceTimersByTime(250);
    });
    expect(result.current).toBe("updated");

    vi.useRealTimers();
  });

  it("should cancel previous timeout on rapid changes", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );

    rerender({ value: "first", delay: 500 });
    act(() => {
      vi.advanceTimersByTime(250);
    });

    rerender({ value: "second", delay: 500 });
    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(result.current).toBe("initial");

    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(result.current).toBe("second");

    vi.useRealTimers();
  });
});
