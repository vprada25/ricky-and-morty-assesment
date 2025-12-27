import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FilterToggleButton } from "./FilterToggleButton";

describe("FilterToggleButton", () => {
  it("should render filter icon button", () => {
    const { container } = render(
      <FilterToggleButton onClick={vi.fn()} isActive={false} />
    );

    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("should call onClick when clicked", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<FilterToggleButton onClick={handleClick} isActive={false} />);

    await user.click(screen.getByLabelText("Toggle filters"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should apply active styles when isActive is true", () => {
    render(<FilterToggleButton onClick={vi.fn()} isActive={true} />);

    const button = screen.getByLabelText("Toggle filters");
    expect(button).toHaveClass("bg-primary-100");
  });

  it("should not apply active styles when isActive is false", () => {
    render(<FilterToggleButton onClick={vi.fn()} isActive={false} />);

    const button = screen.getByLabelText("Toggle filters");
    expect(button).not.toHaveClass("bg-primary-100");
  });

  it("should have accessibility label", () => {
    render(<FilterToggleButton onClick={vi.fn()} isActive={false} />);

    expect(screen.getByLabelText("Toggle filters")).toBeInTheDocument();
  });
});
