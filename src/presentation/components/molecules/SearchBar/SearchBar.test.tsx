import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  const mockProps = {
    value: "",
    onChange: vi.fn(),
    onToggleFilter: vi.fn(),
    isFilterOpen: false,
  };

  it("should render search input", () => {
    render(<SearchBar {...mockProps} />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should render filter toggle button", () => {
    render(<SearchBar {...mockProps} />);

    expect(screen.getByLabelText("Toggle filters")).toBeInTheDocument();
  });

  it("should call onChange when typing", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<SearchBar {...mockProps} onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    await user.type(input, "Rick");

    expect(handleChange).toHaveBeenCalled();
  });

  it("should call onToggleFilter when filter button is clicked", async () => {
    const handleToggleFilter = vi.fn();
    const user = userEvent.setup();

    render(<SearchBar {...mockProps} onToggleFilter={handleToggleFilter} />);

    await user.click(screen.getByLabelText("Toggle filters"));

    expect(handleToggleFilter).toHaveBeenCalledTimes(1);
  });

  it("should display search value", () => {
    render(<SearchBar {...mockProps} value="Morty" />);

    expect(screen.getByDisplayValue("Morty")).toBeInTheDocument();
  });

  it("should apply active styles when filter is open", () => {
    render(<SearchBar {...mockProps} isFilterOpen={true} />);

    const button = screen.getByLabelText("Toggle filters");
    expect(button).toHaveClass("bg-primary-100");
  });
});
