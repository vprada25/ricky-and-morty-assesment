import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Loader } from "./Loader";

describe("Loader", () => {
  it("should render loading spinner", () => {
    const { container } = render(<Loader />);

    const spinner = container.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });

  it("should render with animation classes", () => {
    const { container } = render(<Loader />);

    const spinnerElement = container.querySelector(".animate-spin");
    expect(spinnerElement).toHaveClass("rounded-full", "border-3");
  });

  it("should render with animation classes", () => {
    const { container } = render(<Loader />);

    const spinnerElement = container.querySelector(".animate-spin");
    expect(spinnerElement).toBeInTheDocument();
  });
});
