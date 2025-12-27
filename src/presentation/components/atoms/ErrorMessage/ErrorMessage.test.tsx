import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ErrorMessage } from "./ErrorMessage";

describe("ErrorMessage", () => {
  it("should render error message", () => {
    render(
      <ErrorMessage message="Something went wrong" onDismiss={() => {}} />
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("should render dismiss button", () => {
    const { container } = render(
      <ErrorMessage message="Error occurred" onDismiss={() => {}} />
    );

    const dismissButton = container.querySelector("button");
    expect(dismissButton).toBeInTheDocument();
  });

  it("should apply error styling", () => {
    const { container } = render(
      <ErrorMessage message="Error" onDismiss={() => {}} />
    );

    const errorContainer = container.firstChild;
    expect(errorContainer).toHaveClass("bg-red-50", "text-red-700");
  });
});
