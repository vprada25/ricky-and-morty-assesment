import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "../Badge";

describe("Badge Component", () => {
  it("should render with default variant", () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText("Default");

    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-blue-100");
  });

  it("should render with alive variant", () => {
    render(<Badge variant="alive">Alive</Badge>);
    const badge = screen.getByText("Alive");

    expect(badge).toHaveClass("bg-green-100");
  });

  it("should render with dead variant", () => {
    render(<Badge variant="dead">Dead</Badge>);
    const badge = screen.getByText("Dead");

    expect(badge).toHaveClass("bg-red-100");
  });

  it("should render with unknown variant", () => {
    render(<Badge variant="unknown">Unknown</Badge>);
    const badge = screen.getByText("Unknown");

    expect(badge).toHaveClass("bg-gray-100");
  });
});
