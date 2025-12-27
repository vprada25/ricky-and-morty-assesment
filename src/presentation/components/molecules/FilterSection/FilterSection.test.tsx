import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FilterSection } from "./FilterSection";

describe("FilterSection", () => {
  it("should render section label", () => {
    render(
      <FilterSection label="Species">
        <div>Content</div>
      </FilterSection>
    );

    expect(screen.getByText("Species")).toBeInTheDocument();
  });

  it("should render children", () => {
    render(
      <FilterSection label="Species">
        <button>Human</button>
        <button>Alien</button>
      </FilterSection>
    );

    expect(screen.getByText("Human")).toBeInTheDocument();
    expect(screen.getByText("Alien")).toBeInTheDocument();
  });

  it("should apply proper spacing between items", () => {
    const { container } = render(
      <FilterSection label="Species">
        <div>Item 1</div>
        <div>Item 2</div>
      </FilterSection>
    );

    const flexContainer = container.querySelector(".flex.gap-2");
    expect(flexContainer).toBeInTheDocument();
  });
});
