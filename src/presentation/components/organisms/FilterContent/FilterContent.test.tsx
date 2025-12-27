import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FilterContent } from "./FilterContent";
import { SpeciesType, CharacterType } from "@/domain/entities/enums";

describe("FilterContent", () => {
  const mockOnSpeciesTypeChange = vi.fn();
  const mockOnCharacterTypeChange = vi.fn();

  const defaultProps = {
    speciesType: SpeciesType.All,
    characterType: CharacterType.All,
    onSpeciesTypeChange: mockOnSpeciesTypeChange,
    onCharacterTypeChange: mockOnCharacterTypeChange,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render Specie section", () => {
    render(<FilterContent {...defaultProps} />);

    expect(screen.getByText("Specie")).toBeInTheDocument();
  });

  it("should render Characters section", () => {
    render(<FilterContent {...defaultProps} />);

    expect(screen.getByText("Characters")).toBeInTheDocument();
  });

  it("should render all species options", () => {
    render(<FilterContent {...defaultProps} />);

    expect(screen.getAllByText("All")[0]).toBeInTheDocument();
    expect(screen.getByText("Human")).toBeInTheDocument();
    expect(screen.getByText("Alien")).toBeInTheDocument();
  });

  it("should render all character type options", () => {
    render(<FilterContent {...defaultProps} />);

    expect(screen.getAllByText("All")[1]).toBeInTheDocument();
    expect(screen.getByText("Starred")).toBeInTheDocument();
    expect(screen.getByText("Others")).toBeInTheDocument();
  });

  it("should call onSpeciesTypeChange when species button is clicked", async () => {
    const user = userEvent.setup();

    render(<FilterContent {...defaultProps} />);

    await user.click(screen.getByText("Human"));

    expect(mockOnSpeciesTypeChange).toHaveBeenCalledWith(SpeciesType.Human);
  });

  it("should call onCharacterTypeChange when character type button is clicked", async () => {
    const user = userEvent.setup();

    render(<FilterContent {...defaultProps} />);

    await user.click(screen.getByText("Starred"));

    expect(mockOnCharacterTypeChange).toHaveBeenCalledWith(
      CharacterType.Starred
    );
  });

  it("should highlight selected species", () => {
    render(<FilterContent {...defaultProps} speciesType={SpeciesType.Human} />);

    const humanButton = screen.getByText("Human").closest("button");
    expect(humanButton).toHaveClass("bg-primary-100", "text-primary-600");
  });

  it("should highlight selected character type", () => {
    render(
      <FilterContent {...defaultProps} characterType={CharacterType.Starred} />
    );

    const starredButton = screen.getByText("Starred").closest("button");
    expect(starredButton).toHaveClass("bg-primary-100", "text-primary-600");
  });
});
