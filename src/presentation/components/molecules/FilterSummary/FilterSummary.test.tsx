import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FilterSummary } from "./FilterSummary";

describe("FilterSummary", () => {
  it("should not render when no active filters", () => {
    const { container } = render(
      <FilterSummary resultCount={0} filterCount={0} />
    );

    expect(container.firstChild).toBeNull();
  });

  it("should render result count", () => {
    render(<FilterSummary resultCount={5} filterCount={2} />);

    expect(screen.getByText(/5 Result/)).toBeInTheDocument();
  });

  it("should render filter badge with count", () => {
    render(<FilterSummary resultCount={10} filterCount={3} />);

    expect(screen.getByText(/3 Filter/)).toBeInTheDocument();
  });

  it("should display singular result", () => {
    render(<FilterSummary resultCount={1} filterCount={1} />);

    expect(screen.getByText(/1 Result/)).toBeInTheDocument();
  });

  it("should not render when filter count is zero", () => {
    const { container } = render(
      <FilterSummary resultCount={10} filterCount={0} />
    );

    expect(container.firstChild).toBeNull();
  });
});
