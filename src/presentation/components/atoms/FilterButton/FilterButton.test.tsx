import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FilterButton } from "./FilterButton";

describe("FilterButton", () => {
  it("should render button with label", () => {
    render(<FilterButton label="Human" isSelected={false} onClick={vi.fn()} />);

    expect(screen.getByText("Human")).toBeInTheDocument();
  });

  it("should apply selected styles when isSelected is true", () => {
    render(<FilterButton label="Human" isSelected={true} onClick={vi.fn()} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-primary-100", "text-primary-600");
  });

  it("should apply unselected styles when isSelected is false", () => {
    render(<FilterButton label="Human" isSelected={false} onClick={vi.fn()} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-gray-50", "text-gray-600");
  });

  it("should call onClick when clicked", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <FilterButton label="Human" isSelected={false} onClick={handleClick} />
    );

    await user.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
