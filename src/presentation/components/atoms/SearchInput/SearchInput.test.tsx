import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchInput } from "./SearchInput";

describe("SearchInput", () => {
  it("should render with placeholder", () => {
    render(
      <SearchInput
        value=""
        onChange={vi.fn()}
        placeholder="Search characters"
      />
    );

    expect(
      screen.getByPlaceholderText("Search characters")
    ).toBeInTheDocument();
  });

  it("should display current value", () => {
    render(<SearchInput value="Rick" onChange={vi.fn()} />);

    expect(screen.getByDisplayValue("Rick")).toBeInTheDocument();
  });

  it("should call onChange when typing", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<SearchInput value="" onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    await user.type(input, "Morty");

    expect(handleChange).toHaveBeenCalledTimes(5);
  });

  it("should render search icon", () => {
    const { container } = render(<SearchInput value="" onChange={vi.fn()} />);

    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });
});
