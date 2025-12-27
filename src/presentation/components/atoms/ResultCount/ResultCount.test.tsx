import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ResultCount } from "./ResultCount";

describe("ResultCount", () => {
  it("should render singular result text", () => {
    render(<ResultCount count={1} />);

    expect(screen.getByText(/1 Result/)).toBeInTheDocument();
  });

  it("should render plural results text", () => {
    render(<ResultCount count={5} />);

    expect(screen.getByText(/5 Result/)).toBeInTheDocument();
  });

  it("should render zero results", () => {
    render(<ResultCount count={0} />);

    expect(screen.getByText(/0 Result/)).toBeInTheDocument();
  });

  it("should render large numbers correctly", () => {
    render(<ResultCount count={826} />);

    expect(screen.getByText(/826 Result/)).toBeInTheDocument();
  });
});
