import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  const mockOnPageChange = vi.fn();

  it("should render pagination buttons", () => {
    render(
      <Pagination
        currentPage={1}
        info={{ count: 100, pages: 10, next: null, prev: null }}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByLabelText("Previous page")).toBeInTheDocument();
    expect(screen.getByLabelText("Next page")).toBeInTheDocument();
  });

  it("should disable previous button on first page", () => {
    render(
      <Pagination
        currentPage={1}
        info={{ count: 100, pages: 10, next: null, prev: null }}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByLabelText("Previous page");
    expect(prevButton).toBeDisabled();
  });

  it("should disable next button on last page", () => {
    render(
      <Pagination
        currentPage={10}
        info={{ count: 100, pages: 10, next: null, prev: null }}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByLabelText("Next page");
    expect(nextButton).toBeDisabled();
  });

  it("should enable both buttons on middle page", () => {
    render(
      <Pagination
        currentPage={5}
        info={{ count: 100, pages: 10, next: null, prev: null }}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByLabelText("Previous page");
    const nextButton = screen.getByLabelText("Next page");

    expect(prevButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });

  it("should call onPageChange with previous page when clicking previous", async () => {
    const user = userEvent.setup();

    render(
      <Pagination
        currentPage={5}
        info={{ count: 100, pages: 10, next: null, prev: null }}
        onPageChange={mockOnPageChange}
      />
    );

    await user.click(screen.getByLabelText("Previous page"));

    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it("should call onPageChange with next page when clicking next", async () => {
    const user = userEvent.setup();

    render(
      <Pagination
        currentPage={5}
        info={{ count: 100, pages: 10, next: null, prev: null }}
        onPageChange={mockOnPageChange}
      />
    );

    await user.click(screen.getByLabelText("Next page"));

    expect(mockOnPageChange).toHaveBeenCalledWith(6);
  });

  it("should hide pagination when info is null", () => {
    const { container } = render(
      <Pagination currentPage={1} info={null} onPageChange={mockOnPageChange} />
    );

    expect(container.firstChild).toBeNull();
  });
});
