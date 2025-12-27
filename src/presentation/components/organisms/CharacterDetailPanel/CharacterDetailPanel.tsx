import { FC } from "react";

import { useCharacterSelection } from "@/presentation/hooks/useCharacterSelection";
import { useNavigate } from "react-router-dom";

export const CharacterDetailPanel: FC = () => {
  const navigate = useNavigate();
  const { currentCharacter, isFavorite } = useCharacterSelection();

  if (!currentCharacter) {
    return (
      <div className="items-center justify-center mx-auto h-screen hidden md:flex">
        <p className="text-text-secondary">
          Select a character to view details
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto">
      <button
        onClick={() => navigate("/character")}
        className="lg:hidden flex items-center gap-2 mb-4 text-primary-600 hover:text-primary-700 transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <div className="mb-6">
        <div className="relative w-14 h-14 mb-3">
          <img
            src={currentCharacter.image}
            alt={currentCharacter.name}
            className="w-14 h-14 rounded-full object-cover"
          />
          {isFavorite && (
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
              <svg
                className="w-4 h-4 text-secondary-600 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          )}
        </div>
        <h1 className="text-lg font-bold text-text-primary leading-tight">
          {currentCharacter.name}
        </h1>
      </div>

      <div>
        <div className="py-3 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-text-primary mb-1.5">
            Specie
          </h3>
          <p className="text-sm text-gray-600">{currentCharacter.species}</p>
        </div>

        <div className="py-3 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-text-primary mb-1.5">
            Status
          </h3>
          <p className="text-sm text-gray-600">{currentCharacter.status}</p>
        </div>

        <div className="py-3 border-gray-200">
          <h3 className="text-sm font-semibold text-text-primary mb-1.5">
            Occupation
          </h3>
          <p className="text-sm text-gray-600">
            {currentCharacter.type || "Princess"}
          </p>
        </div>
      </div>
    </div>
  );
};
